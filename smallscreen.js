var condition = true;
document.styleSheets[1].disabled = condition;
function displayNavContent() {
    condition = !condition;
    document.styleSheets[1].disabled = condition;
}