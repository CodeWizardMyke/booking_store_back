document.addEventListener('DOMContentLoaded', () => {

    const buttonsCrudDoc = document.querySelectorAll('#list-doc li')

    for(let i in buttonsCrudDoc){
        const id = buttonsCrudDoc[i].id != undefined ? `#${buttonsCrudDoc[i].id}` : false;

        if(id) {
            document.querySelector(id).addEventListener('click', ()=> {
                update()
                showDivDocumantation(id);
            })
        }
    }

    function showDivDocumantation (id){
        const divDom = document.querySelector( id + '-doc' );

        if(divDom){
            handdlerDisplay()
        }

        function handdlerDisplay (){
            divDom.classList.remove('display-off');
            divDom.classList.add('display-on');
        };
        divDom.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function update(){
        for(let i in buttonsCrudDoc){

            const id = buttonsCrudDoc[i].id != undefined ? `#${buttonsCrudDoc[i].id}` : false;

            id ? handdlerDisplayUpdate(id) : '' ; 
        }
        
        function handdlerDisplayUpdate(id){
            //in dom get any div with passed id
            const div = document.querySelector( id + '-doc' );

            // verify if div exists and div have a clas list macth display on
            if(div && div.classList == 'display-on'){

                //if mach is true remove class of display-on
                div.classList.remove('display-on');
                
                //and add class a display-off
                div.classList.add('display-off');
            }
        }
    }

    /*funções para estilizção*/
    const floatingButton = document.querySelector(".floating-button");
    const menuNav = document.querySelector('.doc-list')

    floatingButton.addEventListener("click", function () {
        menuNav.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    document.querySelector('#nav-to-doc').addEventListener('click', ()=>{
        menuNav.scrollIntoView({ behavior: "smooth", block: "center" });
    })

})