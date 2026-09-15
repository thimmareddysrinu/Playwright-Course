

import ExcelJs from 'exceljs'



async function writeExcel(filepath,searchText,replaceText) {
//async function writeExcel(filepath,searchText,replaceText,changerow) {
    const workbook=new ExcelJs.Workbook()
    await workbook.xlsx.readFile(filepath)
    const worksheet=workbook.getWorksheet("Sheet1")
    const output=await readExcel(worksheet,searchText)


    // const cell=worksheet.getCell(output.row + changerow.changerow,output.column+changerow.changecolumn)
     const cell=worksheet.getCell(output.row,output.column)
    cell.value=replaceText
    await workbook.xlsx.writeFile(filepath)

    // worksheet.eachRow((row,rownumber)=>{


    //     row.eachCell((cell,colNumber)=>{

    //         console.log(cell.value)
            
    //     })

    // })
    
};
async function readExcel(worksheet,searchText) {

let output={row:-1,column:-1}
    worksheet.eachRow((row,rownumber)=>{


        row.eachCell((cell,colNumber)=>{

            if (cell.value === searchText) {

                output.row=rownumber
                output.column=colNumber

                console.log(cell.value)
            
            
            }
            
            
        })

    })
    if (output.row === -1 || output.column === -1) {
        throw new Error(`Value "${searchText}" was not found in the Excel sheet.`);
    }
    return output
};
const changerow={changerow:0,changecolumn:2}
const path="C:/Users/thimm/Downloads/download.xlsx"
writeExcel(path,"Tomato","Kivi");





