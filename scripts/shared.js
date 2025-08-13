
function saveSelection(field, payload){
  try{
    localStorage.setItem("sel."+field, JSON.stringify(payload));
    alert("Saved: "+field+" → "+payload.fa+" / "+payload.en);
  }catch(e){
    alert("Save failed: "+e.message);
  }
}
function loadSelection(field){
  var raw = localStorage.getItem("sel."+field);
  if(!raw) return {fa:"", en:""};
  try{ return JSON.parse(raw); }catch{ return {fa:raw, en:raw}; }
}
function buildPrompts(){
  var fields=["subject","action","environment","style","lighting","mood","composition","scene","time","tolerance","idea","suffix","negative"];
  var faParts=[], enParts=[];
  for(var i=0;i<fields.length;i++){
    var k = fields[i];
    var v = loadSelection(k);
    if(typeof v === "string"){ v = {fa:v, en:v}; }
    if(v.fa && v.fa.trim()) faParts.push(v.fa.trim());
    if(v.en && v.en.trim()) enParts.push(v.en.trim());
  }
  var fa = "Prompt (FA): "+faParts.join(", ");
  var en = "Prompt (EN): "+enParts.join(", ");
  var neg = loadSelection("negative");
  var faNeg = neg.fa && neg.fa.trim() ? ("\nNegative (FA): "+neg.fa.trim()) : "";
  var enNeg = neg.en && neg.en.trim() ? ("\nNegative (EN): "+neg.en.trim()) : "";
  return { fa: fa + faNeg, en: en + enNeg };
}
