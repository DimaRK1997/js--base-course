function compileTemplate(tpl) {
  return function (objDOM, data) {
    const el = objDOM.document.createElement("div");
    objDOM.document.querySelector("body").appendChild(el);
    Object.entries(data).forEach(([key, value]) => {
      tpl = tpl.replace(`{{${key}}}`, value);
    });
    el.innerHTML = tpl;
    return tpl;
  };
}

module.exports = compileTemplate;
