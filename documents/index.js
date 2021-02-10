 module.exports = ({ doctorsName, doctorsPhone, doctorsEmail, medicines, patientsName, patientsAge, patientsPhoneNo, diagnosis, appointmentId, appointmentDate }) => {
    const today = new Date(appointmentDate);
   //  console.log({ doctorsName, doctorsPhone, doctorsEmail, medicines, patientsName, patientsAge, patientsPhoneNo, diagnosis, appointmentId, appointmentDate })
   let medicineString = ""
   medicines.map(medicine => {
      console.log('cholse')
      let Morning = medicine.takeMorning ? 'Yes' : 'No'
      let Day = medicine.takeDay ? 'Yes' : 'No'
      let Night = medicine.takeNight ? 'Yes' : 'No'
      medicineString = medicineString.concat(`<br><br>Medicine Name: ${medicine.name} <br><br>
      Time of Day: Morning : ${Morning}  Day : ${Day}  Night : ${Night} <br><br>`)
   })
   console.log(medicineString)
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><h2>Health Diary</h2></td>
                            <td>
                               Date: ${`${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Patient's Name: ${patientsName} <br><br>
                               Patient's Age: ${patientsAge} <br><br>
                               Patient's Phone No: ${patientsPhoneNo} <br><br>

                               ${medicineString}
                               
                               <br><br>Doctor's Name: ${doctorsName} <br><br>
                               Doctor's Phone No: ${doctorsPhone} <br><br>
                               Doctor's Email: ${doctorsEmail} <br><br>

                               <br><br><br><br>Diagnosis: ${diagnosis} <br><br>
                            </td>
                            <td>
                               Receipt number: ${appointmentId}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                
             </table>
             <br />
        
          </div>
       </body>
    </html>
    `;
};