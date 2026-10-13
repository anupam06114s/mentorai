import jsPDF from "jspdf";

/**
 * Generates an ATS-compliant, pixel-perfect single-column PDF resume.
 * Uses standard typography, clear section hierarchy, margins, and bullet formatting.
 */
export function generateResumePdf(resumeData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;
  let y = 48;

  // Candidate Name Header (19pt Bold)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(15, 23, 42); // slate-900
  const candidateName = (resumeData.candidate_name || "Alex Candidate").toUpperCase();
  doc.text(candidateName, pageWidth / 2, y, { align: "center" });
  y += 18;

  // Contact Info Subtitle (9pt Normal)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600

  const contactList = [
    resumeData.email || "candidate@example.com",
    resumeData.phone || "+91 98765 43210",
    resumeData.location || "Bengaluru, India"
  ].filter(Boolean);

  doc.text(contactList.join("   •   "), pageWidth / 2, y, { align: "center" });
  y += 14;

  // Links line (LinkedIn, GitHub)
  const linksList = [
    resumeData.linkedin ? `LinkedIn: ${resumeData.linkedin}` : "",
    resumeData.github ? `GitHub: ${resumeData.github}` : ""
  ].filter(Boolean);

  if (linksList.length > 0) {
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(linksList.join("   •   "), pageWidth / 2, y, { align: "center" });
    y += 18;
  } else {
    y += 6;
  }

  // Section Header Helper with dividing rule
  function addSectionHeader(title) {
    if (y > pageHeight - 70) {
      doc.addPage();
      y = 45;
    }
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.75);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;
  }

  // Bullet Helper with clean line wrapping
  function addBullet(bulletText, indent = 12) {
    if (y > pageHeight - 45) {
      doc.addPage();
      y = 45;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);

    // Draw bullet symbol
    doc.text("•", margin + 2, y);

    // Wrap lines nicely
    const cleanText = bulletText.replace(/^[-•*]\s*/, "");
    const lines = doc.splitTextToSize(cleanText, contentWidth - indent);
    doc.text(lines, margin + indent, y);
    y += lines.length * 11.5 + 4;
  }

  // 1. PROFESSIONAL SUMMARY
  if (resumeData.summary) {
    addSectionHeader("Professional Summary");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const summaryLines = doc.splitTextToSize(resumeData.summary, contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 11.5 + 6;
  }

  // 2. TECHNICAL SKILLS
  if (resumeData.technical_skills && resumeData.technical_skills.length) {
    addSectionHeader("Technical Skills");
    resumeData.technical_skills.forEach((skillLine) => {
      addBullet(skillLine);
    });
    y += 4;
  }

  // 3. PROFESSIONAL EXPERIENCE
  if (resumeData.experience && resumeData.experience.length) {
    addSectionHeader("Professional Experience");
    resumeData.experience.forEach((exp) => {
      if (y > pageHeight - 60) {
        doc.addPage();
        y = 45;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(exp.role, margin, y);

      const compPeriod = `${exp.company}   |   ${exp.period}`;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text(compPeriod, pageWidth - margin, y, { align: "right" });
      y += 12;

      (exp.bullets || []).forEach((b) => {
        addBullet(b);
      });
      y += 4;
    });
  }

  // 4. KEY PROJECTS
  if (resumeData.projects && resumeData.projects.length) {
    addSectionHeader("Key Projects");
    resumeData.projects.forEach((prj) => {
      if (y > pageHeight - 60) {
        doc.addPage();
        y = 45;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(prj.name, margin, y);

      if (prj.link) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(37, 99, 235);
        doc.text(prj.link, pageWidth - margin, y, { align: "right" });
      }
      y += 12;

      (prj.bullets || []).forEach((b) => {
        addBullet(b);
      });
      y += 4;
    });
  }

  // 5. EDUCATION
  if (resumeData.education && resumeData.education.length) {
    addSectionHeader("Education");
    resumeData.education.forEach((edu) => {
      addBullet(edu);
    });
    y += 4;
  }

  // 6. CERTIFICATIONS
  if (resumeData.certifications && resumeData.certifications.length) {
    addSectionHeader("Certifications");
    resumeData.certifications.forEach((cert) => {
      addBullet(cert);
    });
  }

  // Trigger browser download
  const safeName = (resumeData.candidate_name || "Candidate")
    .replace(/[^a-zA-Z0-9]/g, "_");
  doc.save(`${safeName}_Updated_Resume.pdf`);
}
