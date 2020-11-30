onload = () => {
    if(window.visualViewport.width >= 600)
    {
        let title = document.getElementById("logo")
        let col2 = document.getElementById("c2")
        let altura = title.getBoundingClientRect().height + title.getBoundingClientRect().top
        // console.log(title.getBoundingClientRect())
        col2.style.height = `${altura}px`
    } 
} 


window.onresize = () => {
    if(window.visualViewport.width >= 600)
    {
        let title = document.getElementById("logo")
        let col2 = document.getElementById("c2")
        let altura = title.getBoundingClientRect().height + title.getBoundingClientRect().top
        col2.style.height = `${altura}px`
    }
}