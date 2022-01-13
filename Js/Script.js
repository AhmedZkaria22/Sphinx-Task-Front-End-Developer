$(document).ready(function(){    
    $(".preLoader .preLoader__grid").fadeOut( 2000, function(){
        $(this).parent().fadeOut( function(){ $(this).remove(); } );
        $("#carouselExampleControls").fadeIn( 500, function(){
            $("#carouselExampleControls").css("display", "block");
        } );
        $("#carouselHead").fadeIn( 500, function(){
            $("#carouselHead").css("display", "flex");
        } );
    });   

    const carouselItems = document.getElementsByClassName("carousel-item"),
    prvBtn = document.querySelector(".carouselControlls__prev"),
    nxtBtn = document.querySelector(".carouselControlls__next"),
    prvBtnSup = document.querySelector(".carouselControlls__prev-support"),
    nxtBtnSup = document.querySelector(".carouselControlls__next-support"),
    
    pCounter = document.querySelector(".carouselItemCounter"),
    
    replayBtn = document.querySelector(".carouselControlls__replayBtn"),
    reloadBtn = document.querySelector(".carouselControlls__reloadBtn"),
    showAnsBtn = document.querySelector(".carouselControlls__showAnsBtn"),
    
    carouselContainer =  document.getElementById('carouselExampleControls'),
    carouselHead = document.getElementById('carouselHead'),
    helpContainer = document.querySelector("body .help-item"),
    ResourceContainer = document.querySelector("body .dummy-item"),

    closeHelp = document.querySelector("body .help-item button"),
    openHelp = document.querySelector('#carouselHead button:first-of-type'),
    closeResource = document.querySelector("body .dummy-item button"),
    openResource = document.querySelector('#carouselHead button:last-of-type');    
    
    // Handel Slider Buttons
    const firstSlide = 1,   lastSlide = 4;
    let counterNum = firstSlide;
    const handelCarousleBtns = (number) => {
        if( number <= firstSlide ){
            prvBtn.style.display = 'none';
            prvBtnSup.style.display = 'block';
            prvBtnSup.setAttribute("disabled","");
            prvBtnSup.style.opacity = '0.7';
            console.log( number );
        }else if( number > firstSlide && number < lastSlide ){
            prvBtn.style.display = 'block';    
            prvBtnSup.style.display = 'none';  
            nxtBtn.style.display = 'block';    
            nxtBtnSup.style.display = 'none';                
            console.log( number );
        }else if( number >= lastSlide ){ 
            nxtBtn.style.display = 'none';
            nxtBtnSup.style.display = 'block';
            nxtBtnSup.setAttribute("disabled","");
            nxtBtnSup.style.opacity = '0.7';        
            console.log( number );
        }
    }
    handelCarousleBtns(counterNum);
    pCounter.textContent =  counterNum + ' of ' + carouselItems.length;
    
    prvBtn.addEventListener("click", function(e){
        // ( counterNum - 1 <= 0 ) ? counterNum = 2 : counterNum--;
        if( counterNum - 1 <= firstSlide ){
            counterNum = firstSlide;
            // e.target.style.display = 'none';
            // prvBtnSup.style.display = 'block';
            // prvBtnSup.setAttribute("disabled","");
            // prvBtnSup.style.opacity = '0.7';

            // if( counterNum >= firstSlide ){
            //     nxtBtnSup.style.display = 'none';
            //     nxtBtn.style.display = 'block';    
            // }            
        }else{ counterNum -= 1;  
            // prvBtnSup.style.display = 'none';
            // e.target.style.display = 'block';
        }
        handelCarousleBtns(counterNum);
        pCounter.textContent =  counterNum + ' of ' + carouselItems.length;
    });
    
    nxtBtn.addEventListener("click", function(e){
        // ( counterNum + 1 > 2 ) ? counterNum = 1 : counterNum++;
        if( counterNum + 1 >= lastSlide ){
            counterNum = lastSlide;
            // e.target.style.display = 'none';
            // nxtBtnSup.style.display = 'block';
            // nxtBtnSup.setAttribute("disabled","");
            // nxtBtnSup.style.opacity = '0.7';

            // if( counterNum <= lastSlide ){
            //     prvBtnSup.style.display = 'none';
            //     prvBtn.style.display = 'block';    
            // }            
        }else{ counterNum += 1;  
            // nxtBtnSup.style.display = 'none';
            // e.target.style.display = 'block';
        }
        handelCarousleBtns(counterNum);
        //fItemActiveSpns[i].parentElement.removeAttribute("disabled");
        pCounter.textContent =  counterNum + ' of ' + carouselItems.length;
    });
    // Handel Slider Buttons


    // Handel Answer Buttons
    showAnsBtn.addEventListener("click", function(){    
        for( var t=0; t<carouselItems.length; t++ ){
            if( carouselItems[counterNum-1].contains(carouselItems[t]) ){
                const tItemSpns = document.querySelectorAll(`.carousel-item:nth-of-type(${t+1}) span.tm`);
                for(var i=0; i<tItemSpns.length; i++){     
                        tItemSpns[i].parentElement.setAttribute("disabled","");
                        $(tItemSpns[i]).fadeIn(450);
                }        
                const fItemSpns = document.querySelectorAll(`.carousel-item:nth-of-type(${t+1}) span.fm`);
                for(var i=0; i<fItemSpns.length; i++){     
                    fItemSpns[i].parentElement.setAttribute("disabled",""); 
                    fItemSpns[i].parentElement.style.opacity = '0.7';    
                }        
            }
        }
    });

    const handelReload = (item) => {     
        const tItemActiveSpns = document.querySelectorAll(`${item} span.tm`);
        for(var i=0; i<tItemActiveSpns.length; i++){     
            tItemActiveSpns[i].parentElement.removeAttribute("disabled");
            $(tItemActiveSpns[i]).fadeOut(450);
        }        
        const fItemActiveSpns = document.querySelectorAll(`${item} span.fm`);
        for(var i=0; i<fItemActiveSpns.length; i++){     
            fItemActiveSpns[i].parentElement.removeAttribute("disabled");
            fItemActiveSpns[i].parentElement.style.opacity = '1';    
        }        
    }
    
    reloadBtn.addEventListener("click", () => handelReload('.carousel-item.active') );
    
    replayBtn.addEventListener("click", () => {         
        for( var ac=0; ac<carouselItems.length; ac++ ){
            handelReload(`.carousel-item:nth-of-type(${ac+1})`);
        }
    });
    // Handel Answer Buttons


    // Handel Popup Buttons
    const handelClosePopup = (e) => {
        e.target.parentElement.style.display = 'none';
        carouselContainer.style.opacity = '1';
        carouselHead.style.opacity = '1';
    }

    const handelOpenPopup = (popContainer) => {
        popContainer.style.display = 'flex';
        carouselContainer.style.opacity = '0.35';
        carouselHead.style.opacity = '0.35';
    }

    closeHelp.addEventListener('click', (e)=> handelClosePopup(e) );

    openHelp.addEventListener('click', ()=> handelOpenPopup(helpContainer) );

    closeResource.addEventListener('click', (e)=> handelClosePopup(e) );

    openResource.addEventListener('click', ()=> handelOpenPopup(ResourceContainer) );
    // Handel Popup Buttons
    

    // Handel Scalable
    /* 
        620 = default width of task design before scale / resize
        475 = my default window.innerHeight on my screen

        where window width > 620px {
            app width = 620px
            on decrease screen width : 
                app width = 620 - decreased val , app height = 100vh
        }

        where window width <= 620px {
            app width = 100vw
            on decrease screen width : 
                app width = 100vw , app height = 475 - decreased val
            on decrease screen height : 
                app width = 100vw - decreased val , app height = 100vh                
        }
    */

    window.addEventListener('resize', ()=>{
        const windowWidth = window.innerWidth,
            windowHeight = window.innerHeight,
            contentWrapper = document.querySelector('main');

            const window_Width_Listener = 620 - window.innerWidth;       
            const newHeight = 475 - window_Width_Listener;
            const window_Height_Listener = 475 - window.innerHeight;
            const newWidth = 620 - window_Height_Listener ;
        
        $( document.querySelector('.help-item') ).css({
            "width": "calc(100% - 2.2vw)",
            "left": "1.1vw"
        });
        $( document.querySelector('.dummy-item') ).css({
            "width": "calc(100% - 2.2vw)",
            "left": "1.1vw"
        });
        $( document.querySelector('#carouselExampleControls .carouselControlls') ).css({
            "padding": "1.2% 2% 0.5%"
        });

        const ControllRowElms = [ prvBtn, nxtBtn, prvBtnSup, nxtBtnSup, pCounter, replayBtn, reloadBtn, showAnsBtn ];
        for( let elm of ControllRowElms ){
            $( elm ).css("height", "80%");
        }
 
        if( windowWidth > 620 ){
            $(contentWrapper).css({ "width": "100%", "transform": `scale(${620 / windowWidth}, 1)`});
            if( windowHeight < 475 ){
                $(contentWrapper).css({ "width": "100%", "transform": `scale(${newWidth / windowWidth}, 1)`});
            }
        }

        if( windowWidth <= 620 && windowWidth > 400 ){            
            if( windowHeight >= 475 ){
                $(contentWrapper).css({ "transform": `scale(1, ${newHeight / 475})`});
            }
            else{
                $(contentWrapper).css({ "transform": `scale(${newWidth / 620}, 1)!important`});
                if( newWidth === windowWidth ){
                    $(contentWrapper).css({ "transform": `scale(1, ${newHeight / 475})`});
                }
            }
        }

        if( windowWidth <= 400 && windowWidth > 230 ){
            $(contentWrapper).css({ "width": "100vw", "height": "100vh" });
            if( windowHeight >= 475 ){
                $(contentWrapper).css({ "transform": `scale(1, ${(newHeight / 475)*1.5})`});
            }
            else{
                $(contentWrapper).css({ "transform": `scale(${(newWidth / 620)*1.5}, 1)!important`});
                if( newWidth === windowWidth ){
                    $(contentWrapper).css({ "transform": `scale(1, ${(newHeight / 475)*1.5})`});
                }
            }
        }

        if( windowWidth <= 230 ){
            $(contentWrapper).css({ "width": "100vw", "height": "100vh" });
            if( windowHeight >= 475 ){
                $(contentWrapper).css({ "transform": `scale(1, ${(newHeight / 475)+0.2})`});
            }
            else{
                $(contentWrapper).css({ "transform": `scale(${(newWidth / 620)+0.2}, 1)!important`});
                if( newWidth === windowWidth ){
                    $(contentWrapper).css({ "transform": `scale(1, ${(newHeight / 475)+0.2})`});
                }
            }
        }
    });
// });
});