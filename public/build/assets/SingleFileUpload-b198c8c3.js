import{r as d,ab as m,o,j as r,f as p,n as f,t as g,W as v}from"./id-97c9e5f5.js";const h={key:0,class:"text-danger fs-sm"},_={__name:"SingleFileUpload",props:{modelValue:File,inputClass:String},emits:["update:modelValue"],setup(s,{emit:n}){const u=s,a=d(""),i=e=>["application/pdf","image/jpeg","image/jpg","image/png"].includes(e.type)?e.size>1048576?"Ukuran file tidak boleh lebih dari 1MB.":"":"Format file salah, hanya boleh PDF, JPG, JPEG, dan PNG.",c=e=>{const l=e.target.files[0],t=i(l);t?(a.value=t,n("update:modelValue",null),fileInput.value.value=""):(a.value="",n("update:modelValue",l))};return m(()=>u.modelValue,e=>{e&&(a.value=i(e))}),(e,l)=>(o(),r("div",null,[p("input",{type:"file",class:f(["form-control",s.inputClass]),onChange:c},null,34),a.value?(o(),r("div",h,g(a.value),1)):v("",!0)]))}};export{_};
