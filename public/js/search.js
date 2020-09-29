function myFunction() {
    var a, i, txtValue;
    const input = document.querySelector("#search");
    const filter = input.value.toUpperCase();
    const li = document.querySelectorAll(".student-item");

    for (i = 0; i < li.length; i++) {

        a = li[i].querySelectorAll("h3")[0];
        txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }

    }

}
