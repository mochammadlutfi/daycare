import{_ as p,K as h,m,o as u,e as f,w as o,f as e,p as g,n as y,L as n,t as c}from"./id-1c1e2a8a.js";import{E as v}from"./index-7832f204.js";import"./utils-8b8f2a61.js";import"./localeData-ef2a03d0.js";import"./event-9519ab40.js";const x={components:{},props:{},data(){return{kota_id:null,selected:[],dataLines:["2024-09-18"],isLoading:!0,page:1,pageSize:0,limit:5,total:0,from:0,to:0,params:{page:1,limit:25,q:""}}},async created(){await this.fetchData()},methods:{async setFilter(){this.daerahSelect=!1,await this.fetchData()},cek_tgl(){},doSearch:_.debounce(function(){this.isLoading=!0,this.fetchData()},1e3),async fetchData(a){var a=a??1;try{this.isLoading=!0;const t=await h.get(this.route("user.invoice.data"),{params:{page:a,limit:this.params.limit,q:this.params.q}});t.status==200&&(this.data=t.data.data,this.params.page=t.data.current_page,this.total=t.data.total,this.pageSize=t.data.per_page,this.from=t.data.from,this.to=t.data.to),this.isLoading=!1}catch(t){console.error(t)}},selectAll(s){s.target.checked?this.dataList.data.forEach((a,t)=>{this.selected.push(a.id)}):this.selected=[]},format_date(s){if(s)return moment(String(s)).format("DD MMM YYYY")}}},k={class:"content"},D=e("div",{class:"content-heading d-flex justify-content-between align-items-center"},[e("span",null,"Invoice"),e("div",{class:"space-x-1"})],-1),L={class:"block rounded"},S={class:"block-content"},w=e("br",null,null,-1);function b(s,a,t,C,Y,r){const l=v,d=m("user-layout");return u(),f(d,null,{default:o(()=>[e("div",k,[D,e("div",L,[e("div",S,[g(l,null,{"date-cell":o(({data:i})=>[e("div",{class:y(i.isSelected?"is-selected":"")},[n(c(i.day.split("-").slice(2).join("-"))+" ",1),w,n(" "+c(r.cek_tgl(i.day)?"✔️":""),1)],2)]),_:1})])])])]),_:1})}const N=p(x,[["render",b]]);export{N as default};
