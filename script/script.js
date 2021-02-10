// get Nik ketika menginput nik
let inputNik = document.getElementById('nik')
inputNik.addEventListener('keydown', function(e){
    // console.log(e.target.value)
})

// get tglLahir ketika menginput tanggal_lahir
let inputTglLahir = document.getElementById('tanggal_lahir')
inputTglLahir.addEventListener('keydown', function(eb){
    // console.log(e.target.value)
})

// function hanya input angka
function hanyaAngka(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
 
    return false;
    return true;
}


// ketika button di klick
let btnSubmit = document.getElementById('btn-sub')
var getNik
var getTglLahir

let resultName = document.getElementById('result-name')
let resultUsia = document.getElementById('result-usia')
let resultJenis = document.getElementById('result-jenis')
let resultTglSwab =  document.getElementById('result-tglSwab')
let resultHasil = document.getElementById('result-hasil')
let resultPesan = document.getElementById('result-pesan')

// get box result form
let boxResult = document.getElementById('result-box')
boxResult['style']['display'] = 'none'

// btn klick
btnSubmit.addEventListener('click',function(){
    getNik = Number(inputNik.value)
    getTglLahir = inputTglLahir.value

    let psn = document.getElementById('info')
    
    // jika nik kosong & tgl lahir kosong
    if(getNik === 0 && getTglLahir === ''){
        psn.innerHTML = `"Nik & Tgl Lahir tidak boleh kosong loh.."`
        psn.style.fontSize = '30px'
        psn.style.marginTop = '10'
        boxResult['style']['display'] = 'none'
    // jika nik kosong 
    }else if(getNik === 0){
        psn.innerHTML = `"NIK harus di isi yaa.."`
        psn.style.fontSize = '30px'
        psn.style.marginTop = '10'
        boxResult['style']['display'] = 'none'
    // jika tanggal lahir kosong
    }else if(getTglLahir === ''){
        psn.innerHTML = `"Tanggal Lahir harus di isi yaa.."`
        psn.style.fontSize = '30px'
        psn.style.marginTop = '10'
        boxResult['style']['display'] = 'none'
    }else{
        
        let test = cek(getNik,getTglLahir)
        
        // jika nik atau tanggal lahir tidak cocok 
        if(test === 'kosong'){
            psn.innerHTML = `"yahhh Nik & Tanggal Lahir nya Salah <br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; atau NIK belum terdaftar.."`
            psn.style.fontSize = '30px'
            psn.style.marginTop = '0'
            boxResult['style']['display'] = 'none'
        }else{

        boxResult['style']['display'] = ''

        let nama  = cek(getNik,getTglLahir)[0]['name']
        let usia  = cek(getNik,getTglLahir)[0]['age']
        let jenis  = cek(getNik,getTglLahir)[0]['jenisPemeriksaan']
        let tglSwab  = cek(getNik,getTglLahir)[0]['tanggalSwab']
        let hasil  = cek(getNik,getTglLahir)[0]['hasil']
        let pesan  = cek(getNik,getTglLahir)[0]['message']

        let hasilColor = document.getElementById('result-hasil')

        if(hasil === 'Negatif'){
            hasilColor.style.backgroundColor = 'rgb(68, 233, 164)'
            hasilColor.style.color = 'black'
        }else if(hasil === 'Positif'){
            hasilColor.style.backgroundColor = 'red'
            hasilColor.style.color = 'white'
            hasilColor.style.paddingLeft = '4px'
        }else if(hasil === 'Menunggu'){
            hasilColor.style.backgroundColor = 'yellow'
            hasilColor.style.color = 'black'
        }

        psn.innerHTML = 'berikut hasil SWAB anda..'
        psn.style.fontSize = '30px'
        psn.style.marginBottom = '40px'
        psn.style.marginTop = '-50px'

        // isi result dengan value
        resultName['value'] = nama
        resultUsia['value'] = usia
        resultJenis['value'] = jenis
        resultTglSwab['value'] = tglSwab
        resultHasil['value'] = hasil
        resultPesan['value'] = pesan
    
        // kosongin value form input
        inputTglLahir['value'] = ''
        inputNik['value'] = ''    
        }   
    }
})


// lihat dan menyembunyikan database
let hide = document.getElementById('hide')
let table = document.getElementById('data')
let klickSpan = document.getElementById('klick')
hide.style.display = 'none'
table.style.display = 'none'
klickSpan.addEventListener('click',function(){
    table.style.display = ''
    hide.style.display = ''
    klickSpan.style.display = 'none'
})
hide.addEventListener('click',function(){
    table.style.display = 'none'
    hide.style.display = 'none'
    klickSpan.style.display = ''
})




// Database
let dataBase =  [   
    {
        name:'Ardi',
        tanggalLahir: '010194',
        age: '26 Th',
        nik: 111,
        jenisPemeriksaan: 'Swab Antigen',
        tanggalSwab: '04 january 2021',
        hasil: 'Negatif',
        message: 'Hasil Anda Negatif. Mohon tetap melakukan pola hidup sehat dengan mencuci tangan, memakai masker dan menjaga Jarak'
    },
    {
        name:'Idham',
        tanggalLahir: '010296',
        age: '24 Th',
        nik: 112,
        jenisPemeriksaan: 'Rapid Test',
        tanggalSwab: '27 January 2021',
        hasil: 'Menunggu',
        message: 'Hasil Anda Negatif. Silahkan Cek kembali di lain Hari dan mohon tetap melakukan Isolasi Mandiri sampai hasi Keluar!'
    },
    {
        name:'Erickson',
        tanggalLahir: '200592',
        age: '28 Th',
        nik: 113,
        jenisPemeriksaan: 'Swab PCR',
        tanggalSwab: '06 February 2021',
        hasil: 'Positif',
        message: 'Hasil Swab PCR anda Positif. Segera hubungi Rumah Sakit terdekat untuk penanganan lebih lanjut, serta mohon isolasi mandiri terlebih dahulu'
    },
]


// Function Cek
function cek(nik,tglLahir){
    let arr = []
    for(let i=0; i<dataBase.length; i++){
        var dataNik = dataBase[i].nik
        var dataTglLahir = dataBase[i].tanggalLahir
        let obj = {}
        if(nik === dataNik && tglLahir === dataTglLahir){
            obj.name        = dataBase[i].name
            obj.tanggalLahir= dataBase[i].tanggalLahir
            obj.age         = dataBase[i].age
            obj.nik         = dataBase[i].nik
            obj.jenisPemeriksaan = dataBase[i].jenisPemeriksaan
            obj.tanggalSwab = dataBase[i].tanggalSwab
            obj.hasil       = dataBase[i].hasil
            obj.message     = dataBase[i].message
            // push to array   
            arr.push(obj)
        }
    }
    if(arr.length === 0){
        return `kosong`
    }
    return arr
}