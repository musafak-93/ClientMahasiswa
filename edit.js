function findbyid (){
    let view = document.getElementById('data');
    let idobj = document.getElementById('inputid');
    let idn = idobj.elements[0].value;
    let url = 'http://localhost:36633/2018CWS1/webresources/mhs.mahasiswa';
    let nurl = url + '/' +idn;
    $.ajax ({
        url : nurl,
        method : 'GET',
        dataType: 'xml',
        success : function (resp) {
            if (resp != null){
                let id = resp.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                let nama = resp.getElementsByTagName("nama")[0].childNodes[0].nodeValue;
                let nim = resp.getElementsByTagName("nim")[0].childNodes[0].nodeValue;
                let html = '<table border="1">';
                    html += '<th>ID</th><th>Nama</th><th>NIM</th><tr>'
                    html += '<td>'+id+'</td><td>'+nama+'</td><td>'+nim+'</td>';
                    html += '</tr></table>';
                view.innerHTML = html;

            }
            else {view.innerHTML = 'tidak ada data';}
        },
        fail: function (e) {}
    })
}

function deletebyid(){
    let view = document.getElementById('delete');
    let idobj = document.getElementById('inputid');
    let idn = idobj.elements[0].value;
    let url = 'http://localhost:36633/2018CWS1/webresources/mhs.mahasiswa';
    let nurl = url + '/' +idn;
    $.ajax ({
        url : nurl,
        method : 'DELETE',
        dataType: 'xml',
        success : function (resp) {
            view.innerHTML = idn + ' deleted';
        },
        fail: function (e) {
            view.innerHTML = 'failed';
        }
    })
    
}

function showalldata(){
    let view = document.getElementById('show');
    let urls = "http://localhost:36633/2018CWS1/webresources/mhs.mahasiswa";

    $.ajax ({
        url: urls,
        method: 'GET',
        success: function (xml){
            console.log(xml);
            let table = xml2html (xml);
            view.innerHTML = table;
        },
        fail: function (e) {alert('error');}
    })
    //view.innerHTML = "Show here";
}

function xml2html (xml) {
    let sdata = xml.getElementsByTagName('mahasiswa').length;
    let table = "<table border='1'>";
    table += '<tr> <th>ID</th> <th>NAMA</th> <th>NIM</th> </tr>'
    for (row=0;row<sdata;row++){
        let id = xml.getElementsByTagName("id")[row].childNodes[0].nodeValue;
        let nama = xml.getElementsByTagName("nama")[row].childNodes[0].nodeValue;
        let nim = xml.getElementsByTagName("nim")[row].childNodes[0].nodeValue;
        table += '<tr> <td>'+id+'</td> <td>'+nama+'</td> <td>'+nim+'</td></tr>'
    }
    table += "</table>";
    return table;

}

function createdata(){
    let urls = "http://localhost:36633/2018CWS1/webresources/mhs.mahasiswa";
    let view = document.getElementById('add');
    let idinput = document.getElementById('inputid');
    let id = idinput.elements[0].value;
    let nama = idinput.elements[1].value;
    let nim = idinput.elements[2].value;
    let xml = '<mahasiswa>';
        xml += '<id>'+id+'</id><nama>'+nama+'</nama><nim>'+nim+'</nim>';
        xml += '</mahasiswa>';
    $.ajax ({
        url : urls,
        method : 'POST',
        contentType: 'application/xml',
        data: xml,
        success : function (resp) {
            view.innerHTML = '1 baris dengan id'+id+' sudah ditambahkan';
        },
        fail: function (e) {
            view.innerHTML = 'Data gagal disimpan';
        }
    })
}