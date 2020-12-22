let copy;
let btn;
let tmp;
let ref;
let count = 1;

window.onload = function() {
  btn = document.getElementById('addButton');
  ref = document.getElementById('copy');
  copy = ref.cloneNode(true);
  document.getElementById('addButton').addEventListener('click', addButton);
  ref.children[1].name = "checklist1";
}

function addButton() {
  tmp = copy.cloneNode(true);
  count++;
  tmp.children[1].name = tmp.children[1].name + (count + "");
  btn.parentNode.insertBefore(tmp, btn);
  document.getElementById('length').value = (count + "");
}
