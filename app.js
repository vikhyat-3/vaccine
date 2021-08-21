const search=document.getElementById("sub");
const pin=document.getElementById("pincode");
const display=document.getElementById("table");
const center_title=document.createElement("div");
const vaccine_type=document.createElement("div");
const fee_title=document.createElement("div");
const state_title=document.createElement("div");
const district_title=document.createElement("div");
center_title.className=fee_title.className=district_title.className=state_title.className=vaccine_type.className="col";
center_title.innerText="Center Name";
fee_title.innerText="Fee Type";
district_title.innerText="District";
state_title.innerText="State";
vaccine_type.innerText="Vaccine"
const first_row=document.createElement("div");
first_row.className='row';
const state_list= fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states").then(res=> {
    return res.json();
})
.then(data=>{
    return data;
})
.catch(e=>{
    console.log(e);
})
console.log(state_list);
search.addEventListener("click",function(event){
    event.preventDefault()
    load_initial();
    var code=pin.value;
    console.log(code)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today=(parseInt(dd))+"-"+mm+"-"+yyyy;
    console.log(today);
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${code}&date=${today}`)
    .then(res=>{
        console.log(res);
        data=res.data;
            let data1=(Object.keys(data));
            let num=(data.centers.length);
            for(let i=0;i<num;i++){
                let center_name=toTitleCase(data.centers[i].name);
                let fee=toTitleCase(data.centers[i].fee_type);
                let district=toTitleCase(data.centers[i].district_name);
                let state=toTitleCase(data.centers[i].state_name);
                let vaccine=toTitleCase(data.centers[i].sessions[0].vaccine);
                //alert(vaccine);
                let row=insertRow(createRow(),createCol(center_name),createCol(vaccine),createCol(fee),createCol(state),createCol(district));
            }
        })
        .catch(e=>{
            console.log(e);
        })
    /*fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${code}&date=${today}`)
        .then(res=>{
            console.log("SUCCESS");
            return (res.json());
        })
        .then(data=>{
            console.log(data);
            let data1=(Object.keys(data));
            let num=(data.centers.length);
            for(let i=0;i<num;i++){
                let center_name=(data.centers[i].name);
                let fee=data.centers[i].fee_type;
                let district=data.centers[i].district_name;
                let state=data.centers[i].state_name;
                let vaccine=data.centers[i].sessions[0].vaccine;
                //alert(vaccine);
                let row=insertRow(createRow(),createCol(center_name),createCol(vaccine),createCol(fee),createCol(state),createCol(district));
            }
        })
        .catch(e=>{
            console.log(e);
        })*/
        console.log(display);
})
function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
function createRow()
{
    let new_row=document.createElement("div");
    new_row.className="row";
    return new_row;
}
function insertRow(r,c,v,f,s,d)
{
    r.append((c));
    r.append(v);
    r.append((f));
    r.append(s);
    r.append(d);
    display.append(r);
}
function createCol(item)
{
    let new_col=document.createElement("div");
    new_col.className="col";
    new_col.innerText=item;
    return new_col;
}
function load_initial()
{
    display.innerHTML="";
    insertRow(first_row,center_title,vaccine_type,fee_title,state_title,district_title); 
}

