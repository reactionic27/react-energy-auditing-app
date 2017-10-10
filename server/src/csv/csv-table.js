
export default function csvTable(csvData) {
  return `
    <html>
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      </head>
      <body>
        <table class="table table-striped table-condensed table-hover table-bordered">
          <tr>
            ${csvData.fields.map(header => `<th>${header}</th>`).join('\n')}
          </tr>
          ${csvData.data.map(row => `
            <tr>
              ${row.map(val => `<td>${val == null ? '' : val}</td>`).join('\n')}
            </tr>
          `).join('\n')}
        </table>
      </body>
    </html>
  `
}
