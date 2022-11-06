const afk_hidden = document.querySelectorAll(".afk_hidden")
const buttons = document.querySelectorAll("button")

function delay(delay, value) {
    const timeout = setTimeout(value, delay);
    return {
        cancel() {
          clearTimeout(timeout);
        }
      };
};

function show_afk() {
    showed = true;
    afk_hidden.forEach(element => {
        element.setAttribute("Style", element.getAttribute("showPos"))
    });
}

function hide_afk() {
    showed = false;
    afk_hidden.forEach(element => {
        element.setAttribute("Style", element.getAttribute("hidePos"))
    });
}

hide_afk()

let del = null;

onmousemove = () => {
    if (del) {
        del.cancel();
    }
    show_afk();
    del = delay(2000, hide_afk);
};

buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
        setTimeout(() => {
            if (del) {
                del.cancel()
            }
        }, 500)
    })
})