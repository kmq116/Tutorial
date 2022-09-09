function Vue({ el, data }) {
  const target = document.getElementById(el.slice(1));
  const mustacheRe = /\{\{(.*)\}\}/;
  const matchResult = target.textContent.match(mustacheRe);
  if (matchResult) {
    const key = target.textContent.match(mustacheRe)[1].trim();
    target.textContent = data[key];
  }
  if (target.children && target.children.length) {
    const attrs = Array.from(target.children[0].attributes);
    attrs.forEach((attr) => {
      if (attr.name.includes("v-bind:")) {
        const key = attr.name.split(":")[1];
        const valKey = attr.value;
        target.children[0].setAttribute(key, data[valKey]);
      }
    });
  }
}
export default Vue;
