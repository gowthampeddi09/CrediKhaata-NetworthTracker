import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateCustomerStatement = (customer, transactions) => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text(`${customer.name} - Statement`, 14, 22);
  
  // Add customer details
  doc.setFontSize(12);
  doc.text(`Phone: ${customer.phone}`, 14, 32);
  doc.text(`Address: ${customer.address}`, 14, 38);
  doc.text(`Email: ${customer.email}`, 14, 44);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 50);
  
  // Calculate total due
  const totalDue = transactions.reduce((sum, t) => sum + t.remainingAmount, 0);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Outstanding: ₹${totalDue.toFixed(2)}`, 14, 60);
  doc.setFont(undefined, 'normal');
  
  // Add transactions table
  const tableColumn = ["Date", "Item", "Amount", "Due Date", "Paid", "Remaining"];
  
  const tableRows = transactions.map(transaction => {
    const paidAmount = transaction.amount - transaction.remainingAmount;
    return [
      new Date(transaction.createdAt).toLocaleDateString(),
      transaction.item,
      `₹${transaction.amount.toFixed(2)}`,
      new Date(transaction.dueDate).toLocaleDateString(),
      `₹${paidAmount.toFixed(2)}`,
      `₹${transaction.remainingAmount.toFixed(2)}`,
    ];
  });
  
  doc.autoTable({
    startY: 70,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    foot: [['', '', '', 'Total', `₹${totalDue.toFixed(2)}`]],
  });
  
  // Add repayments table if there are any
  const hasRepayments = transactions.some(t => t.repayments && t.repayments.length > 0);
  
  if (hasRepayments) {
    doc.addPage();
    doc.setFontSize(16);
    doc.text(`${customer.name} - Repayment History`, 14, 20);
    
    let yPos = 30;
    
    transactions.forEach(transaction => {
      if (transaction.repayments && transaction.repayments.length > 0) {
        doc.setFontSize(14);
        doc.text(`Item: ${transaction.item} (₹${transaction.amount.toFixed(2)})`, 14, yPos);
        yPos += 10;
        
        const repaymentColumn = ["Date", "Amount"];
        const repaymentRows = transaction.repayments.map(repayment => [
          new Date(repayment.date).toLocaleDateString(),
          `₹${repayment.amount.toFixed(2)}`,
        ]);
        
        doc.autoTable({
          startY: yPos,
          head: [repaymentColumn],
          body: repaymentRows,
          theme: 'grid',
          headStyles: { fillColor: [46, 204, 113], textColor: 255 },
        });
        
        yPos = doc.autoTable.previous.finalY + 15;
      }
    });
  }
  
  // Save and return as blob
  const pdfBlob = doc.output('blob');
  return URL.createObjectURL(pdfBlob);
};
