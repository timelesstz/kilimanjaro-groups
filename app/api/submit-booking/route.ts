import { NextResponse } from "next/server"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email template
function generateEmailHTML(booking: any) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/booking/${formattedBookingCode}`)}`
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Kilimanjaro+Climb+-+${booking.route}&dates=${new Date(booking.departureDate).toISOString().replace(/-|:|\.\d\d\d/g, '')}/${new Date(new Date(booking.departureDate).getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString().replace(/-|:|\.\d\d\d/g, '')}&details=Your+Kilimanjaro+climb+with+Snow+Africa+Adventure.%0ABooking+Reference:+${formattedBookingCode}&location=Arusha,+Tanzania`
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation - ${formattedBookingCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 0 0 8px 8px;
          }
          .booking-details {
            background: #f7fafc;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            font-size: 14px;
            color: #718096;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #1a365d;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
          }
          .info-section {
            margin: 15px 0;
            padding: 15px;
            border-left: 4px solid #1a365d;
            background: #f8fafc;
          }
          .highlight {
            color: #1a365d;
            font-weight: bold;
          }
          .booking-code {
            font-size: 32px;
            color: #1a365d;
            font-weight: bold;
            text-align: center;
            padding: 20px;
            background: #f0f4f8;
            border: 2px dashed #1a365d;
            border-radius: 8px;
            margin: 20px 0;
            letter-spacing: 2px;
          }
          .reference-box {
            background: #e2e8f0;
            border-radius: 4px;
            padding: 8px 12px;
            display: inline-block;
            font-family: monospace;
            font-size: 16px;
            letter-spacing: 1px;
          }
          .summary-box {
            background: #f0f4f8;
            border: 1px solid #cbd5e0;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
          }
          .important-note {
            background: #fff3cd;
            border-left: 4px solid #fbbf24;
            padding: 15px;
            margin: 15px 0;
          }
          .qr-code-section {
            text-align: center;
            margin: 20px 0;
          }
          .weather-info {
            background: #e6f7ff;
            border: 1px solid #91d5ff;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .payment-info {
            background: #f6ffed;
            border: 1px solid #b7eb8f;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .timeline {
            position: relative;
            padding: 20px 0;
          }
          .timeline-item {
            padding-left: 30px;
            margin: 15px 0;
            position: relative;
          }
          .timeline-item:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #1a365d;
          }
          .timeline-item:after {
            content: '';
            position: absolute;
            left: 5px;
            top: 12px;
            width: 2px;
            height: calc(100% + 10px);
            background: #e2e8f0;
          }
          .timeline-item:last-child:after {
            display: none;
          }
          .checklist {
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .checklist-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
          }
          .checklist-item:before {
            content: '✓';
            color: #38a169;
            margin-right: 10px;
            font-weight: bold;
          }
          .status-tracker {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .status-steps {
            display: flex;
            justify-content: space-between;
            position: relative;
            margin: 20px 0;
          }
          .status-step {
            flex: 1;
            text-align: center;
            position: relative;
            z-index: 1;
          }
          .status-step-circle {
            width: 30px;
            height: 30px;
            background: #e2e8f0;
            border-radius: 50%;
            margin: 0 auto 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #718096;
          }
          .status-step.active .status-step-circle {
            background: #38a169;
            color: white;
          }
          .status-step-label {
            font-size: 12px;
            color: #718096;
          }
          .status-step.active .status-step-label {
            color: #38a169;
            font-weight: bold;
          }
          .status-line {
            position: absolute;
            top: 15px;
            left: 0;
            right: 0;
            height: 2px;
            background: #e2e8f0;
            z-index: 0;
          }
          .payment-reminder {
            background: #fed7d7;
            border: 1px solid #fc8181;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .add-to-calendar {
            display: inline-block;
            padding: 12px 24px;
            background: #38a169;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 0;
          }
          .interactive-buttons {
            display: flex;
            gap: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
          }
          .interactive-button {
            flex: 1;
            min-width: 200px;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.2s;
          }
          .interactive-button:hover {
            transform: translateY(-2px);
          }
          .button-primary {
            background: #1a365d;
            color: white;
          }
          .button-secondary {
            background: #38a169;
            color: white;
          }
          .button-outline {
            border: 2px solid #1a365d;
            color: #1a365d;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Booking Confirmation</h1>
          <p>Snow Africa Adventure - Kilimanjaro Climb</p>
          <div class="booking-code">
            ${formattedBookingCode}
          </div>
        </div>
        
        <div class="content">
          <div class="status-tracker">
            <h3 style="margin-top: 0;">Booking Status</h3>
            <div class="status-line"></div>
            <div class="status-steps">
              <div class="status-step active">
                <div class="status-step-circle">1</div>
                <div class="status-step-label">Booking Received</div>
              </div>
              <div class="status-step">
                <div class="status-step-circle">2</div>
                <div class="status-step-label">Deposit Paid</div>
              </div>
              <div class="status-step">
                <div class="status-step-circle">3</div>
                <div class="status-step-label">Booking Confirmed</div>
              </div>
              <div class="status-step">
                <div class="status-step-circle">4</div>
                <div class="status-step-label">Final Payment</div>
              </div>
              <div class="status-step">
                <div class="status-step-circle">5</div>
                <div class="status-step-label">Ready to Climb</div>
              </div>
            </div>
          </div>

          <div class="summary-box">
            <h2 style="margin-top: 0;">Quick Reference</h2>
            <p><strong>Booking Number:</strong> <span class="reference-box">${formattedBookingCode}</span></p>
            <p><strong>Departure Date:</strong> ${booking.departureDate}</p>
            <p><strong>Route:</strong> ${booking.route}</p>
            <p><strong>Lead Climber:</strong> ${booking.fullName}</p>
          </div>

          <p>Dear ${booking.fullName},</p>
          
          <p>Thank you for booking your Kilimanjaro climb with Snow Africa Adventure. Your booking has been received and is being processed under reference number <span class="reference-box">${formattedBookingCode}</span>.</p>
          
          <div class="weather-info">
            <h3 style="margin-top: 0;">Weather Information</h3>
            <p>🌡️ <strong>Temperature Range:</strong> -10°C to 30°C (14°F to 86°F)</p>
            <p>🌧️ <strong>Best Climbing Seasons:</strong></p>
            <ul>
              <li>January-March (Warm & Dry)</li>
              <li>June-October (Cool & Dry)</li>
            </ul>
            <p>⚠️ Please check our preparation guide for detailed weather information and packing recommendations.</p>
          </div>

          <div class="booking-details">
            <h2>Booking Details</h2>
            <p><strong>Route:</strong> ${booking.route}</p>
            <p><strong>Departure Date:</strong> ${booking.departureDate}</p>
            <p><strong>Group Size:</strong> ${booking.numberOfTrekkers} trekker(s)</p>
            <p><strong>Total Price:</strong> ${booking.totalPrice} USD</p>
            <p><strong>Deposit Required:</strong> ${booking.depositAmount} USD</p>
            <p><strong>Balance Due:</strong> ${booking.totalPrice - booking.depositAmount} USD (60 days before departure)</p>
          </div>

          <div class="payment-info">
            <h3 style="margin-top: 0;">Payment Schedule</h3>
            <p>💳 <strong>Deposit Due:</strong> ${booking.depositAmount} USD (Within 7 days)</p>
            <p>💰 <strong>Final Balance:</strong> ${booking.totalPrice - booking.depositAmount} USD</p>
            <p>📅 <strong>Balance Due Date:</strong> ${new Date(new Date(booking.departureDate).getTime() - (60 * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
            <p><em>Note: Your booking will be confirmed once we receive the deposit payment.</em></p>
          </div>

          <div class="payment-reminder">
            <h3 style="margin-top: 0;">⚠️ Payment Reminder</h3>
            <p><strong>Action Required:</strong> Please complete your deposit payment of ${booking.depositAmount} USD within 7 days to secure your booking.</p>
            <p><strong>Due Date:</strong> ${new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toLocaleDateString()}</p>
            <p>Your booking will be automatically cancelled if the deposit is not received by the due date.</p>
          </div>

          <div class="timeline">
            <h3>Your Journey Timeline</h3>
            <div class="timeline-item">
              <strong>Today</strong>: Booking Received
            </div>
            <div class="timeline-item">
              <strong>Within 24 Hours</strong>: Booking Review & Payment Instructions
            </div>
            <div class="timeline-item">
              <strong>Within 7 Days</strong>: Deposit Payment Due
            </div>
            <div class="timeline-item">
              <strong>60 Days Before Departure</strong>: Final Payment Due
            </div>
            <div class="timeline-item">
              <strong>30 Days Before</strong>: Pre-Climb Briefing & Final Details
            </div>
            <div class="timeline-item">
              <strong>${booking.departureDate}</strong>: Your Adventure Begins!
            </div>
          </div>

          <div class="checklist">
            <h3 style="margin-top: 0;">Pre-Climb Checklist</h3>
            <div class="checklist-item">Review Preparation Guide</div>
            <div class="checklist-item">Make Deposit Payment</div>
            <div class="checklist-item">Book Travel Insurance</div>
            <div class="checklist-item">Get Medical Check-up</div>
            <div class="checklist-item">Start Physical Training</div>
            <div class="checklist-item">Check Passport Validity</div>
            <div class="checklist-item">Arrange Vaccinations</div>
            <div class="checklist-item">Review Packing List</div>
          </div>

          <div class="important-note">
            <h3 style="margin-top: 0;">Important Information</h3>
            <p>🔑 Your booking reference: <strong>${formattedBookingCode}</strong></p>
            <p>📅 Departure date: <strong>${booking.departureDate}</strong></p>
            <p>💰 Deposit due: <strong>${booking.depositAmount} USD</strong></p>
            <p>Please quote your booking reference in all communications.</p>
          </div>
          
          <div class="info-section">
            <h3>Personal Information</h3>
            <p><strong>Full Name:</strong> ${booking.fullName}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Nationality:</strong> ${booking.nationality}</p>
            <p><strong>Passport Number:</strong> ${booking.passportNumber}</p>
            <p><strong>Emergency Contact:</strong> ${booking.emergencyContact}</p>
            <p><strong>Emergency Phone:</strong> ${booking.emergencyPhone}</p>
          </div>
          
          ${booking.rentalEquipment && booking.rentalEquipment.length > 0 ? `
          <div class="info-section">
            <h3>Requested Equipment</h3>
            <ul>
              ${booking.rentalEquipment.map((item: string) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          ${booking.additionalServices && booking.additionalServices.length > 0 ? `
          <div class="info-section">
            <h3>Additional Services</h3>
            <ul>
              ${booking.additionalServices.map((service: string) => `<li>${service}</li>`).join('')}
            </ul>
          </div>
          ` : ''}
          
          ${booking.dietaryRequirements ? `
          <div class="info-section">
            <h3>Dietary Requirements</h3>
            <p>${booking.dietaryRequirements}</p>
          </div>
          ` : ''}
          
          ${booking.medicalConditions ? `
          <div class="info-section">
            <h3>Medical Information</h3>
            <p>${booking.medicalConditions}</p>
          </div>
          ` : ''}
          
          ${booking.specialRequirements ? `
          <div class="info-section">
            <h3>Special Requirements</h3>
            <p>${booking.specialRequirements}</p>
          </div>
          ` : ''}
          
          <div class="summary-box">
            <h3 style="margin-top: 0;">Next Steps</h3>
            <ol style="margin-bottom: 0;">
              <li>Our team will review your booking and contact you within 24 hours.</li>
              <li>You'll receive payment instructions for the deposit (${booking.depositAmount} USD).</li>
              <li>Once deposit is received, your booking will be confirmed.</li>
              <li>Final payment (${booking.totalPrice - booking.depositAmount} USD) is due 60 days before departure.</li>
              <li>You'll receive a comprehensive pre-climb briefing and packing list.</li>
            </ol>
          </div>
          
          <div class="important-note">
            <p><strong>📌 Booking Reference:</strong> Always include <span class="reference-box">${formattedBookingCode}</span> in all correspondence.</p>
          </div>
          
          <div class="interactive-buttons">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/preparation-guide" class="interactive-button button-primary">
              📋 Preparation Guide
            </a>
            <a href="${calendarUrl}" target="_blank" class="interactive-button button-secondary">
              📅 Add to Calendar
            </a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/booking/${formattedBookingCode}" class="interactive-button button-outline">
              🔍 Track Booking
            </a>
          </div>
          
          <div class="info-section">
            <h3>Stay Connected</h3>
            <p>Follow your booking progress and get updates:</p>
            <p>📱 Download our mobile app to track your booking</p>
            <p>📧 Enable notifications for important updates</p>
            <p>📞 WhatsApp updates: +255 123 456 789</p>
          </div>

          <div class="info-section">
            <h3>Contact Information</h3>
            <p>If you have any questions, please don't hesitate to contact us:</p>
            <p>📧 Email: info@snowafricaadventure.com</p>
            <p>📞 Phone: +255 123 456 789</p>
            <p>🌍 Website: www.snowafricaadventure.com</p>
            <p>📍 Location: Arusha, Tanzania</p>
          </div>

          <div class="qr-code-section">
            <h3>Quick Access to Your Booking</h3>
            <p>Scan this QR code to access your booking details:</p>
            <img src="${qrCodeUrl}" alt="Booking QR Code" style="width: 150px; height: 150px;">
          </div>
        </div>
        
        <div class="footer">
          <p>Snow Africa Adventure<br>
          Your Gateway to Kilimanjaro<br>
          Arusha, Tanzania</p>
          <p style="font-family: monospace; font-size: 16px; margin-top: 20px;">
            Booking Reference: ${formattedBookingCode}
          </p>
        </div>
      </body>
    </html>
  `
}

// Generate payment reminder email template
function generatePaymentReminderHTML(booking: any, reminderType: 'deposit' | 'balance', daysRemaining: number) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  const amount = reminderType === 'deposit' ? booking.depositAmount : booking.paymentSchedule.balanceAmount
  const dueDate = reminderType === 'deposit' ? booking.paymentSchedule.depositDueDate : booking.paymentSchedule.balanceDueDate
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Reminder - ${formattedBookingCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 0 0 8px 8px;
          }
          .urgent-box {
            background: #fff5f5;
            border: 2px solid #fc8181;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          .payment-details {
            background: #f7fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: #1a365d;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 0;
          }
          .countdown {
            font-size: 24px;
            font-weight: bold;
            color: #e53e3e;
            margin: 10px 0;
          }
          .reference-box {
            background: #e2e8f0;
            border-radius: 4px;
            padding: 8px 12px;
            display: inline-block;
            font-family: monospace;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Payment Reminder</h1>
          <p>Snow Africa Adventure - Kilimanjaro Climb</p>
        </div>
        
        <div class="content">
          <p>Dear ${booking.fullName},</p>
          
          <div class="urgent-box">
            <h2 style="color: #e53e3e; margin-top: 0;">⚠️ Action Required</h2>
            <p>Your ${reminderType} payment of <strong>$${amount} USD</strong> is due in:</p>
            <div class="countdown">${daysRemaining} days</div>
            <p>Due Date: ${new Date(dueDate).toLocaleDateString()}</p>
          </div>

          <div class="payment-details">
            <h3 style="margin-top: 0;">Booking Details</h3>
            <p><strong>Booking Reference:</strong> <span class="reference-box">${formattedBookingCode}</span></p>
            <p><strong>Route:</strong> ${booking.route}</p>
            <p><strong>Departure Date:</strong> ${booking.departureDate}</p>
            ${reminderType === 'deposit' ? `
            <p><strong>Total Price:</strong> $${booking.totalPrice} USD</p>
            <p><strong>Deposit Amount Due:</strong> $${amount} USD</p>
            ` : `
            <p><strong>Remaining Balance Due:</strong> $${amount} USD</p>
            `}
          </div>

          <p><strong>Why this payment is important:</strong></p>
          ${reminderType === 'deposit' ? `
          <ul>
            <li>Secures your booking for the climb</li>
            <li>Allows us to begin preparations for your arrival</li>
            <li>Confirms your commitment to the selected dates</li>
            <li>Booking will be cancelled if deposit is not received by the due date</li>
          </ul>
          ` : `
          <ul>
            <li>Completes your booking payment</li>
            <li>Enables us to finalize all arrangements</li>
            <li>Ensures all services are confirmed for your climb</li>
            <li>Required to participate in the climb</li>
          </ul>
          `}

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/booking/${formattedBookingCode}/payment" class="button">
              Make Payment Now
            </a>
          </div>

          <p><strong>Need assistance?</strong></p>
          <p>If you have any questions or need help with the payment process, please don't hesitate to contact us:</p>
          <p>📧 Email: info@snowafricaadventure.com</p>
          <p>📞 Phone: +255 123 456 789</p>
          <p>💬 WhatsApp: +255 123 456 789</p>

          <p style="font-size: 12px; color: #718096; margin-top: 30px;">
            This is an automated reminder. Please ignore if you have already made the payment.
          </p>
        </div>
      </body>
    </html>
  `
}

// Generate tracking update email template
function generateTrackingUpdateHTML(booking: any, status: string, nextStep: string) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Status Update - ${formattedBookingCode}</title>
        <style>
          // ... existing email styles ...
          .status-update {
            background: #ebf8ff;
            border: 2px solid #4299e1;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          .next-step {
            background: #f0fff4;
            border: 1px solid #68d391;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Booking Status Update</h1>
          <p>Snow Africa Adventure - Kilimanjaro Climb</p>
        </div>
        
        <div class="content">
          <p>Dear ${booking.fullName},</p>
          
          <div class="status-update">
            <h2 style="color: #2b6cb0; margin-top: 0;">🎉 Status Update</h2>
            <p>Your booking status has been updated to:</p>
            <div style="font-size: 24px; font-weight: bold; margin: 15px 0;">
              ${status}
            </div>
          </div>

          <div class="next-step">
            <h3 style="margin-top: 0;">Next Steps</h3>
            <p>${nextStep}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/booking/${formattedBookingCode}" class="button">
              View Booking Details
            </a>
          </div>

          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>📧 Email: info@snowafricaadventure.com</p>
          <p>📞 Phone: +255 123 456 789</p>
        </div>
      </body>
    </html>
  `
}

// Generate pre-climb briefing email template
function generatePreClimbBriefingHTML(booking: any) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  const departureDate = new Date(booking.departureDate)
  const briefingDate = new Date(departureDate.getTime() - (2 * 24 * 60 * 60 * 1000))
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Pre-Climb Briefing - ${formattedBookingCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 0 0 8px 8px;
          }
          .briefing-section {
            background: #f0f9ff;
            border: 1px solid #93c5fd;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
          }
          .equipment-list {
            background: #f8fafc;
            border: 1px solid #cbd5e0;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .schedule-item {
            display: flex;
            margin: 10px 0;
            padding: 10px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .schedule-time {
            font-weight: bold;
            min-width: 100px;
          }
          .altitude-warning {
            background: #fff5f5;
            border: 2px solid #fc8181;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .meeting-point {
            background: #f0fff4;
            border: 1px solid #68d391;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .interactive-buttons {
            display: flex;
            gap: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
          }
          .interactive-button {
            flex: 1;
            min-width: 200px;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.2s;
          }
          .interactive-button:hover {
            transform: translateY(-2px);
          }
          .button-primary {
            background: #1a365d;
            color: white;
          }
          .button-secondary {
            background: #38a169;
            color: white;
          }
          .button-outline {
            border: 2px solid #1a365d;
            color: #1a365d;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Pre-Climb Briefing</h1>
          <p>Snow Africa Adventure - Kilimanjaro Climb</p>
          <div class="booking-code">${formattedBookingCode}</div>
        </div>
        
        <div class="content">
          <p>Dear ${booking.fullName},</p>
          
          <div class="briefing-section">
            <h2>Final Briefing Details</h2>
            <p>Your climb begins in 2 days! Here's everything you need to know:</p>
            
            <div class="meeting-point">
              <h3>Meeting Point & Time</h3>
              <p>📍 <strong>Location:</strong> Snow Africa Adventure Office, Arusha</p>
              <p>🕒 <strong>Date:</strong> ${briefingDate.toLocaleDateString()}</p>
              <p>⏰ <strong>Time:</strong> 4:00 PM (16:00) East African Time</p>
              <p>Please arrive 15 minutes early for registration.</p>
            </div>
          </div>

          <div class="equipment-list">
            <h3>Final Equipment Check</h3>
            <p>Essential items to bring to the briefing:</p>
            <ul>
              <li>Passport</li>
              <li>Travel insurance documentation</li>
              <li>Medical certificates (if applicable)</li>
              <li>All your climbing gear for inspection</li>
              ${booking.rentalEquipment ? `<li>Rental equipment will be provided during briefing</li>` : ''}
            </ul>
          </div>

          <div class="altitude-warning">
            <h3>⚠️ Important Health Information</h3>
            <p>Please inform us immediately if you have experienced any of these in the past 48 hours:</p>
            <ul>
              <li>Fever or flu-like symptoms</li>
              <li>Respiratory issues</li>
              <li>Physical injuries</li>
              <li>Any other health concerns</li>
            </ul>
          </div>

          <div class="briefing-section">
            <h3>Briefing Agenda</h3>
            <div class="schedule-item">
              <div class="schedule-time">4:00 PM</div>
              <div>Welcome & Registration</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">4:15 PM</div>
              <div>Route Overview & Strategy</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">4:45 PM</div>
              <div>Safety Briefing & Health Check</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">5:15 PM</div>
              <div>Equipment Check & Distribution</div>
            </div>
            <div class="schedule-item">
              <div class="schedule-time">5:45 PM</div>
              <div>Q&A Session</div>
            </div>
          </div>

          <div class="interactive-buttons">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/preparation-guide" class="interactive-button button-primary">
              📋 Review Preparation Guide
            </a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/packing-list" class="interactive-button button-secondary">
              🎒 Download Packing List
            </a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/route-map/${booking.route}" class="interactive-button button-outline">
              🗺️ View Route Map
            </a>
          </div>

          <div class="info-section">
            <h3>Contact Information</h3>
            <p>For any last-minute questions:</p>
            <p>📞 Emergency Contact: +255 123 456 789 (24/7)</p>
            <p>📧 Email: info@snowafricaadventure.com</p>
            <p>📍 Office: [Office Address in Arusha]</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Generate final confirmation email template
function generateFinalConfirmationHTML(booking: any) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Final Confirmation - ${formattedBookingCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 0 0 8px 8px;
          }
          .confirmation-box {
            background: #f0fff4;
            border: 2px solid #68d391;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          .guide-info {
            background: #f7fafc;
            border: 1px solid #cbd5e0;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .weather-forecast {
            background: #ebf8ff;
            border: 1px solid #4299e1;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .interactive-buttons {
            display: flex;
            gap: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
          }
          .interactive-button {
            flex: 1;
            min-width: 200px;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.2s;
          }
          .interactive-button:hover {
            transform: translateY(-2px);
          }
          .button-primary {
            background: #1a365d;
            color: white;
          }
          .button-secondary {
            background: #38a169;
            color: white;
          }
          .button-outline {
            border: 2px solid #1a365d;
            color: #1a365d;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Final Confirmation</h1>
          <p>Snow Africa Adventure - Kilimanjaro Climb</p>
          <div class="booking-code">${formattedBookingCode}</div>
        </div>
        
        <div class="content">
          <div class="confirmation-box">
            <h2 style="color: #2f855a; margin-top: 0;">🎉 You're All Set!</h2>
            <p>Everything is confirmed for your Kilimanjaro climb.</p>
            <p style="font-size: 20px; font-weight: bold;">
              ${new Date(booking.departureDate).toLocaleDateString()}
            </p>
          </div>

          <div class="guide-info">
            <h3>Your Climbing Team</h3>
            <p><strong>Lead Guide:</strong> [Guide Name]</p>
            <p><strong>Assistant Guides:</strong> [Assistant Names]</p>
            <p><strong>Team Size:</strong> ${booking.numberOfTrekkers} climbers</p>
            <p><strong>Support Staff:</strong> [Number] porters and [Number] cooks</p>
          </div>

          <div class="weather-forecast">
            <h3>Weather Forecast</h3>
            <p>5-day forecast for your climb:</p>
            [Weather Forecast Details]
          </div>

          <div class="interactive-buttons">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/final-checklist" class="interactive-button button-primary">
              ✓ Final Checklist
            </a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/weather-forecast" class="interactive-button button-secondary">
              🌤️ Detailed Weather
            </a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/guide-profile" class="interactive-button button-outline">
              👥 Meet Your Team
            </a>
          </div>
        </div>
      </body>
    </html>
  `
}

// Generate post-climb survey email template
function generatePostClimbSurveyHTML(booking: any) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  const summitImage = 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=800'
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Share Your Kilimanjaro Experience - ${formattedBookingCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 0 0 8px 8px;
          }
          .hero-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
            margin: 20px 0;
          }
          .survey-section {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
          }
          .rating-stars {
            font-size: 24px;
            color: #fbbf24;
            letter-spacing: 4px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Share Your Kilimanjaro Experience</h1>
          <p>Snow Africa Adventure</p>
        </div>
        
        <div class="content">
          <img src="${summitImage}" alt="Kilimanjaro Summit" class="hero-image">
          
          <p>Dear ${booking.fullName},</p>
          
          <p>Congratulations on conquering Kilimanjaro! 🎉 We hope you're still basking in the glory of your achievement.</p>
          
          <div class="survey-section">
            <h3>Help Us Improve</h3>
            <p>Your feedback is invaluable in helping us enhance the experience for future climbers.</p>
            <div class="interactive-buttons">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/survey/${formattedBookingCode}" class="interactive-button button-primary">
                📝 Complete Survey
              </a>
            </div>
          </div>

          <div class="survey-section">
            <h3>Quick Rating</h3>
            <p>How would you rate your overall experience?</p>
            <div class="rating-stars">
              ⭐⭐⭐⭐⭐
            </div>
          </div>

          <div class="survey-section">
            <h3>Share Your Photos</h3>
            <p>Upload your favorite moments from the climb:</p>
            <div class="interactive-buttons">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/photos/${formattedBookingCode}" class="interactive-button button-secondary">
                📸 Share Photos
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

// Generate testimonial request email template
function generateTestimonialRequestHTML(booking: any) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  const testimonialImage = 'https://images.unsplash.com/photo-1613339027986-b94d85708995?auto=format&fit=crop&w=800'
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Share Your Story - ${formattedBookingCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 0 0 8px 8px;
          }
          .testimonial-box {
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${testimonialImage}');
            background-size: cover;
            background-position: center;
            color: white;
            padding: 40px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
          }
          .quote-box {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Share Your Kilimanjaro Story</h1>
          <p>Snow Africa Adventure</p>
        </div>
        
        <div class="content">
          <div class="testimonial-box">
            <h2>Your Journey Inspires Others</h2>
            <p>Help future climbers by sharing your Kilimanjaro experience</p>
          </div>
          
          <p>Dear ${booking.fullName},</p>
          
          <p>Your recent achievement of climbing Kilimanjaro is truly inspiring! Would you consider sharing your story to help others on their journey?</p>
          
          <div class="quote-box">
            <h3>Share Your Experience</h3>
            <p>Some prompts to consider:</p>
            <ul>
              <li>What motivated you to climb Kilimanjaro?</li>
              <li>What was your most memorable moment?</li>
              <li>What advice would you give future climbers?</li>
              <li>How did our team support your journey?</li>
            </ul>
          </div>

          <div class="interactive-buttons">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/testimonial/${formattedBookingCode}" class="interactive-button button-primary">
              ✍️ Write Testimonial
            </a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/video-testimonial/${formattedBookingCode}" class="interactive-button button-secondary">
              🎥 Record Video
            </a>
          </div>
        </div>
      </body>
    </html>
  `
}

// Generate gear checklist reminder email template
function generateGearChecklistReminderHTML(booking: any) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  const gearImage = 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=800'
  const mapImage = 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800'
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Gear Checklist Reminder - ${formattedBookingCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 0 0 8px 8px;
          }
          .gear-hero {
            position: relative;
            height: 300px;
            border-radius: 8px;
            overflow: hidden;
            margin: 20px 0;
          }
          .gear-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .gear-hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7));
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: white;
            text-align: center;
            padding: 20px;
          }
          .gear-category {
            background: white;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .gear-item {
            display: flex;
            align-items: center;
            padding: 8px;
            border-bottom: 1px solid #eee;
          }
          .gear-item:last-child {
            border-bottom: none;
          }
          .gear-item-status {
            margin-left: auto;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
          .status-required {
            background: #fed7d7;
            color: #e53e3e;
          }
          .status-optional {
            background: #e6fffa;
            color: #319795;
          }
          .map-section {
            position: relative;
            height: 200px;
            border-radius: 8px;
            overflow: hidden;
            margin: 20px 0;
          }
          .map-section img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .weather-widget {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .weather-day {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #eee;
          }
          .progress-tracker {
            background: #f0f9ff;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .progress-bar {
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            margin: 10px 0;
            overflow: hidden;
          }
          .progress-fill {
            height: 100%;
            background: #4299e1;
            border-radius: 4px;
            transition: width 0.3s ease;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Gear Checklist Reminder</h1>
          <p>Snow Africa Adventure - Kilimanjaro Climb</p>
        </div>
        
        <div class="content">
          <div class="gear-hero">
            <img src="${gearImage}" alt="Climbing Gear">
            <div class="gear-hero-overlay">
              <h2>Prepare for Your Adventure</h2>
              <p>Your climb begins in ${Math.ceil((new Date(booking.departureDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days!</p>
            </div>
          </div>

          <p>Dear ${booking.fullName},</p>
          
          <div class="progress-tracker">
            <h3>Your Preparation Progress</h3>
            <p>Gear Readiness: 60%</p>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 60%"></div>
            </div>
          </div>

          <div class="gear-category">
            <h3>Essential Gear</h3>
            <div class="gear-item">
              <span>Hiking Boots</span>
              <span class="gear-item-status status-required">Required</span>
            </div>
            <div class="gear-item">
              <span>Sleeping Bag (-10°C/14°F rated)</span>
              <span class="gear-item-status status-required">Required</span>
            </div>
            <div class="gear-item">
              <span>Waterproof Jacket</span>
              <span class="gear-item-status status-required">Required</span>
            </div>
          </div>

          <div class="map-section">
            <img src="${mapImage}" alt="Route Map">
          </div>

          <div class="weather-widget">
            <h3>Expected Weather Conditions</h3>
            <div class="weather-day">
              <span>Base Camp</span>
              <span>15°C to 25°C (59°F to 77°F)</span>
            </div>
            <div class="weather-day">
              <span>Summit</span>
              <span>-10°C to 0°C (14°F to 32°F)</span>
            </div>
          </div>

          <div class="interactive-buttons">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/gear-checklist/${formattedBookingCode}" class="interactive-button button-primary">
              📋 Complete Checklist
            </a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/rental-gear/${formattedBookingCode}" class="interactive-button button-secondary">
              🎒 Rent Equipment
            </a>
          </div>
        </div>
      </body>
    </html>
  `
}

// Generate training progress update email template
function generateTrainingProgressHTML(booking: any, weekNumber: number, progress: any) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  const trainingImage = 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=800'
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Training Progress Update - Week ${weekNumber} - ${formattedBookingCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 0 0 8px 8px;
          }
          .progress-section {
            background: #f0f9ff;
            border: 1px solid #93c5fd;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
          }
          .activity-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
          }
          .progress-bar {
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            margin: 10px 0;
            overflow: hidden;
          }
          .progress-fill {
            height: 100%;
            background: #4299e1;
            border-radius: 4px;
            transition: width 0.3s ease;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin: 15px 0;
          }
          .stat-box {
            background: #f8fafc;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Training Progress - Week ${weekNumber}</h1>
          <p>Snow Africa Adventure - Kilimanjaro Climb</p>
        </div>
        
        <div class="content">
          <p>Dear ${booking.fullName},</p>
          
          <div class="progress-section">
            <h2>Weekly Progress Summary</h2>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress.weeklyCompletion}%"></div>
            </div>
            <p>Overall Progress: ${progress.weeklyCompletion}%</p>
            
            <div class="stats-grid">
              <div class="stat-box">
                <strong>${progress.totalDistance}</strong>
                <p>KM Covered</p>
              </div>
              <div class="stat-box">
                <strong>${progress.totalHours}</strong>
                <p>Hours Trained</p>
              </div>
              <div class="stat-box">
                <strong>${progress.elevationGain}</strong>
                <p>M Elevation Gain</p>
              </div>
              <div class="stat-box">
                <strong>${progress.activeDays}</strong>
                <p>Active Days</p>
              </div>
            </div>
          </div>

          <div class="activity-card">
            <h3>Activities Completed</h3>
            <ul>
              ${progress.activities.map((activity: string) => `<li>${activity}</li>`).join('')}
            </ul>
          </div>

          <div class="progress-section">
            <h3>Next Week's Goals</h3>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress.nextWeekCompletion}%"></div>
            </div>
            <p>Goals: ${progress.nextWeekGoals.map((goal: string) => `${goal}`).join(', ')}</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Generate acclimatization tips email template
function generateAcclimatizationTipsHTML(booking: any, currentAltitude: number) {
  const formattedBookingCode = `KIL-${booking.bookingCode}`
  const mountainImage = 'https://images.unsplash.com/photo-1613339027986-b94d85708995?auto=format&fit=crop&w=800'
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Acclimatization Tips - ${formattedBookingCode}</title>
        <style>
          body { 
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e2e8f0;
            border-radius: 0 0 8px 8px;
          }
          .altitude-section {
            background: #f0f9ff;
            border: 1px solid #93c5fd;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
          }
          .tip-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin: 10px 0;
          }
          .warning-box {
            background: #fff5f5;
            border: 2px solid #fc8181;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          .map-container {
            height: 300px;
            border-radius: 8px;
            overflow: hidden;
            margin: 20px 0;
          }
        </style>
        <script src='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.js'></script>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      </head>
      <body>
        <div class="header">
          <h1>Acclimatization Guide</h1>
          <p>Snow Africa Adventure - Kilimanjaro Climb</p>
        </div>
        
        <div class="content">
          <p>Dear ${booking.fullName},</p>
          
          <div class="altitude-section">
            <h2>Current Status</h2>
            <p>You are now at: <strong>${currentAltitude}m</strong></p>
            <div class="map-container" id="map"></div>
            <script>
              mapboxgl.accessToken = '${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}';
              const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/outdoors-v11',
                center: [37.3556, -3.0674],
                zoom: 12,
                interactive: false
              });
              
              // Add route line
              map.on('load', () => {
                map.addSource('route', {
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'LineString',
                      coordinates: [
                        [37.3556, -3.0674], // Customize based on actual route
                        [37.3590, -3.0699],
                        [37.3610, -3.0720]
                      ]
                    }
                  }
                });
                
                map.addLayer({
                  id: 'route',
                  type: 'line',
                  source: 'route',
                  layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                  },
                  paint: {
                    'line-color': '#1a365d',
                    'line-width': 4
                  }
                });
              });
            </script>
          </div>

          <div class="tips-section">
            <h3>Key Tips for This Altitude</h3>
            <div class="tip-card">
              <h4>Hydration</h4>
              <p>Aim to drink 4-5 liters of water today</p>
              <ul>
                <li>Start drinking early in the morning</li>
                <li>Sip water regularly throughout the day</li>
                <li>Check your urine color (should be light)</li>
              </ul>
            </div>
            
            <div class="tip-card">
              <h4>Breathing Exercises</h4>
              <p>Practice these exercises every 2-3 hours:</p>
              <ul>
                <li>Deep belly breathing (5 minutes)</li>
                <li>Box breathing technique</li>
                <li>Pressure breathing during ascent</li>
              </ul>
            </div>
            
            <div class="tip-card">
              <h4>Rest & Recovery</h4>
              <ul>
                <li>Take regular breaks during hiking</li>
                <li>Sleep with upper body slightly elevated</li>
                <li>Avoid overexertion</li>
              </ul>
            </div>
          </div>

          <div class="warning-box">
            <h3>⚠️ Watch for These Symptoms</h3>
            <ul>
              <li>Severe headache that doesn't improve with rest</li>
              <li>Nausea or vomiting</li>
              <li>Dizziness or loss of balance</li>
              <li>Extreme fatigue</li>
            </ul>
            <p><strong>Important:</strong> Report any symptoms to your guide immediately</p>
          </div>

          <div class="interactive-buttons">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/altitude-tracker/${formattedBookingCode}" class="interactive-button button-primary">
              📊 Track Your Progress
            </a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/health-log" class="interactive-button button-secondary">
              📝 Log Health Status
            </a>
          </div>
        </div>
      </body>
    </html>
  `
}

// Enhance booking tracking with more details
interface ExtendedTracking extends booking.tracking {
  visaStatus: {
    required: boolean;
    submitted: boolean;
    approved: boolean;
    expiryDate: string | null;
    notes: string;
  };
  flightDetails: {
    arrivalFlight: {
      flightNumber: string;
      airline: string;
      arrivalDate: string;
      arrivalTime: string;
      confirmed: boolean;
    };
    departureFlight: {
      flightNumber: string;
      airline: string;
      departureDate: string;
      departureTime: string;
      confirmed: boolean;
    };
  };
  healthStatus: {
    medicalFormSubmitted: boolean;
    medicalClearance: boolean;
    specialRequirements: string[];
    medications: string[];
  };
  equipmentTracking: {
    personalGear: {
      required: string[];
      confirmed: string[];
      missing: string[];
    };
    rentalGear: {
      requested: string[];
      reserved: string[];
      collected: boolean;
      returned: boolean;
    };
  };
  trainingProgress: {
    currentStatus: 'not_started' | 'in_progress' | 'completed';
    weeklyGoals: {
      week: number;
      completed: boolean;
      activities: {
        type: string;
        duration: number;
        completed: boolean;
      }[];
    }[];
    fitnessAssessments: {
      date: string;
      endurance: number;
      strength: number;
      flexibility: number;
      notes: string;
    }[];
  };
  acclimatizationTracking: {
    status: 'pending' | 'in_progress' | 'completed';
    checkpoints: {
      altitude: number;
      location: string;
      reached: boolean;
      symptoms: string[];
      vitals: {
        pulseRate: number;
        oxygenSaturation: number;
        timestamp: string;
      }[];
    }[];
    dailyReports: {
      date: string;
      altitude: number;
      symptoms: string[];
      medications: string[];
      notes: string;
    }[];
  };
}

export async function POST(request: Request) {
  try {
    const booking = await request.json()
    
    // Format the booking code with timestamp and random string
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substr(2, 6).toUpperCase()
    booking.bookingCode = booking.bookingCode || `${timestamp}-${randomStr}`
    
    // Calculate important dates
    const depositDueDate = new Date(timestamp + (7 * 24 * 60 * 60 * 1000))
    const departureDate = new Date(booking.departureDate)
    const balanceDueDate = new Date(departureDate.getTime() - (60 * 24 * 60 * 60 * 1000))
    
    // Add payment schedule and tracking info to booking
    booking.paymentSchedule = {
      depositAmount: booking.depositAmount,
      depositDueDate: depositDueDate.toISOString(),
      balanceAmount: booking.totalPrice - booking.depositAmount,
      balanceDueDate: balanceDueDate.toISOString(),
      departureDate: departureDate.toISOString()
    }

    booking.tracking = {
      status: 'Booking Received',
      lastUpdated: new Date().toISOString(),
      timeline: [
        {
          status: 'Booking Received',
          date: new Date().toISOString(),
          details: 'Initial booking submitted',
          type: 'booking'
        }
      ],
      statusHistory: [
        {
          status: 'Booking Received',
          date: new Date().toISOString(),
          notes: 'Booking successfully submitted to system'
        }
      ],
      paymentStatus: {
        deposit: 'pending',
        finalPayment: 'pending'
      },
      documentStatus: {
        passport: 'pending',
        medicalForm: 'pending',
        insuranceDoc: 'pending',
        liabilityWaiver: 'pending'
      },
      equipmentStatus: {
        checklist: 'pending',
        rentalItems: booking.rentalEquipment ? 'pending' : 'not_required'
      },
      briefingStatus: {
        scheduled: false,
        completed: false,
        date: null
      }
    }

    // Send confirmation email to customer if they opted in
    if (booking.sendCopyEmail) {
      await resend.emails.send({
        from: 'Snow Africa Adventure <bookings@snowafricaadventure.com>',
        to: booking.email,
        subject: `Kilimanjaro Climb Booking Confirmation - ${booking.bookingCode}`,
        html: generateEmailHTML(booking),
      })
    }

    // Always send notification to admin
    await resend.emails.send({
      from: 'Snow Africa Adventure <bookings@snowafricaadventure.com>',
      to: 'info@snowafricaadventure.com',
      bcc: 'info@craftedbytimeless.com',
      subject: `New Kilimanjaro Booking - ${booking.bookingCode}`,
      html: generateEmailHTML(booking),
    })

    // Schedule payment reminder emails
    const reminderDates = [
      { days: 5, type: 'deposit' as const },
      { days: 45, type: 'balance' as const },
      { days: 30, type: 'balance' as const },
      { days: 15, type: 'balance' as const },
      { days: 7, type: 'balance' as const },
    ]

    for (const reminder of reminderDates) {
      const dueDate = reminder.type === 'deposit' ? depositDueDate : balanceDueDate
      const reminderDate = new Date(dueDate.getTime() - (reminder.days * 24 * 60 * 60 * 1000))
      
      // Only schedule if reminder date is in the future
      if (reminderDate > new Date()) {
        // Schedule reminder email
        const reminderEmail = {
          from: 'Snow Africa Adventure <bookings@snowafricaadventure.com>',
          to: booking.email,
          subject: `Payment Reminder - ${reminder.type === 'deposit' ? 'Deposit' : 'Final Balance'} Due in ${reminder.days} Days`,
          html: generatePaymentReminderHTML(booking, reminder.type, reminder.days)
        }
        
        // Here you would integrate with your task scheduling system
        // For example: await scheduleEmail(reminderEmail, reminderDate)
      }
    }

    // Enhanced tracking object with training and acclimatization
    booking.tracking = {
      ...booking.tracking,
      trainingProgress: {
        currentStatus: 'not_started',
        weeklyGoals: Array.from({ length: 12 }, (_, i) => ({
          week: i + 1,
          completed: false,
          activities: [
            {
              type: 'Cardio',
              duration: 60,
              completed: false
            },
            {
              type: 'Strength',
              duration: 45,
              completed: false
            },
            {
              type: 'Flexibility',
              duration: 30,
              completed: false
            }
          ]
        })),
        fitnessAssessments: []
      },
      acclimatizationTracking: {
        status: 'pending',
        checkpoints: [
          {
            altitude: 2700,
            location: 'Machame Gate',
            reached: false,
            symptoms: [],
            vitals: []
          },
          {
            altitude: 3000,
            location: 'Machame Camp',
            reached: false,
            symptoms: [],
            vitals: []
          },
          {
            altitude: 3850,
            location: 'Shira Camp',
            reached: false,
            symptoms: [],
            vitals: []
          },
          {
            altitude: 4600,
            location: 'Lava Tower',
            reached: false,
            symptoms: [],
            vitals: []
          },
          {
            altitude: 5895,
            location: 'Uhuru Peak',
            reached: false,
            symptoms: [],
            vitals: []
          }
        ],
        dailyReports: []
      }
    }

    // Schedule gear checklist reminder email
    const gearChecklistDate = new Date(departureDate.getTime() - (30 * 24 * 60 * 60 * 1000))
    const gearEmail = {
      from: 'Snow Africa Adventure <gear@snowafricaadventure.com>',
      to: booking.email,
      subject: 'Gear Checklist Reminder - Prepare for Your Kilimanjaro Climb',
      html: generateGearChecklistReminderHTML(booking)
    }
    // await scheduleEmail(gearEmail, gearChecklistDate)

    // Schedule post-climb emails
    const climbEndDate = new Date(departureDate.getTime() + (7 * 24 * 60 * 60 * 1000))
    
    // Schedule survey email for 2 days after climb
    const surveyDate = new Date(climbEndDate.getTime() + (2 * 24 * 60 * 60 * 1000))
    const surveyEmail = {
      from: 'Snow Africa Adventure <feedback@snowafricaadventure.com>',
      to: booking.email,
      subject: 'Share Your Kilimanjaro Experience',
      html: generatePostClimbSurveyHTML(booking)
    }
    // await scheduleEmail(surveyEmail, surveyDate)

    // Schedule testimonial request for 5 days after climb
    const testimonialDate = new Date(climbEndDate.getTime() + (5 * 24 * 60 * 60 * 1000))
    const testimonialEmail = {
      from: 'Snow Africa Adventure <feedback@snowafricaadventure.com>',
      to: booking.email,
      subject: 'Share Your Kilimanjaro Story',
      html: generateTestimonialRequestHTML(booking)
    }
    // await scheduleEmail(testimonialEmail, testimonialDate)

    // Schedule training progress emails
    for (let week = 1; week <= 12; week++) {
      const emailDate = new Date(Date.now() + (week * 7 * 24 * 60 * 60 * 1000))
      const trainingEmail = {
        from: 'Snow Africa Adventure <training@snowafricaadventure.com>',
        to: booking.email,
        subject: `Training Progress - Week ${week}`,
        html: generateTrainingProgressHTML(booking, week, {
          weeklyCompletion: 0,
          totalDistance: 0,
          totalHours: 0,
          elevationGain: 0,
          activeDays: 0,
          activities: [],
          nextWeekGoals: []
        })
      }
      // await scheduleEmail(trainingEmail, emailDate)
    }

    // Schedule acclimatization tips emails based on climb schedule
    const acclimatizationCheckpoints = [
      { altitude: 2700, day: 1 },
      { altitude: 3000, day: 2 },
      { altitude: 3850, day: 3 },
      { altitude: 4600, day: 4 },
      { altitude: 5895, day: 5 }
    ]

    for (const checkpoint of acclimatizationCheckpoints) {
      const emailDate = new Date(departureDate.getTime() + (checkpoint.day * 24 * 60 * 60 * 1000))
      const acclimatizationEmail = {
        from: 'Snow Africa Adventure <climb@snowafricaadventure.com>',
        to: booking.email,
        subject: `Acclimatization Tips - ${checkpoint.altitude}m`,
        html: generateAcclimatizationTipsHTML(booking, checkpoint.altitude)
      }
      // await scheduleEmail(acclimatizationEmail, emailDate)
    }

    return NextResponse.json({ 
      success: true, 
      message: "Booking submitted successfully",
      bookingCode: booking.bookingCode,
      paymentSchedule: booking.paymentSchedule,
      tracking: booking.tracking
    })
  } catch (error) {
    console.error("Error processing booking:", error)
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    )
  }
}

