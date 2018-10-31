# WEBPACK 4 

1. Pour installer les d�pendances du projet (seulement la premi�re fois) :

    `$ npm install`

    Si npm n'est pas reconnu en tant que commande interne, installer node et r�essayer : 

    https://nodejs.org/en/download/
    
2. Pour mettre en route le dev-server :

    `$ cd front`
    
    `$ npm run start`

 3. Ouvrir http://localhost:8080/ si cela ne se fait pas automatiquement
 
 4. Pour modifier les fichiers source : modifier les fichiers du r�pertoire front/src (pour le CSS on utilise du SCSS, pour le JS, ES6). 
 
    La structure _classique_ d'un fichier JS est la suivante :
        
        // Import de plugins
        import $ from 'jquery'
        
        // Cr�ation de la classe 
        export default class Module {
            constructor() {
                // Initialisation des �l�ments
                this.initEls();
                // Initialisation des �v�nements
                this.initEvents();
            }
            
            initEls() {
                // Objets jQuery
                this.$els = {
                    $jqueryElement : $('jquerySelector'),
                    $jqueryElement2: $('jquerySelector2'),
                }
                
                // Objets non jquery
                this.myBool = true;
                this.defaultValue = 5;
            }
            initEvents () {
                // Fonction � appeler lors de la cr�ation de la classe 'Module'
                this.initializeDatePicker();
                
                // Fonction � appeler lors du clic du $jqueryElement
                this.$els.$jqueryElement.on('click', this.elementOnClick.bind(this));
            }
            
            initializeDatePicker () {
                // Code pour initialiser le date picker
            }
            
            elementOnClick () {
                // Code on click
            }
        }
    
    Pour importer un module dans un fichier js :
            
        1. Dans listing.js (le module � exporter) :
        
        export default class Listing {
            constructor () {
                this.initEvents();
            }
            initEvents () {
                console.log('initEvents from listing.js');
            }
        }
    
        2. Dans index.js (le fichier o� on veut importer le module) :
        
        // Dans initEls()
        this.$els.listing = $('.js-listing');
        
        // Dans launchPage() (appel� dans initEvents())
        if (this.$els.listing.length) {
            this.importListing();
        }
        
        importListing () {
            // /* webpackChunkName = "..." */ = nom du fichier js qui sera g�n�r�
            // Dans notre cas, le fichier js s'appellera listing.bundle.js 
            // (avec en pr�fixe le nom de la marque blanche + '-' si c'est le cas, 
            // par exemple : regionv2-listing.bundle.js)
            import(/* webpackChunkName: "listing" */ './listing.js').then(module => {
                const Listing = module.default;
                new Listing();
                // le console.log de listing.js devrait s'afficher dans la console du navigateur
            });
        }
       
 5. Pour g�n�rer les fichiers � mettre en prod (dans le r�pertoire /front) : 
 
     `$ npm run build`
     
     Le js sera g�n�r� dans le dossier /js, le css dans le dossier /css et les images dans le dossier /images.
     
     /!\ Penser � modifier la variable **MB** dans le fichier de prod de Webpack afin que les fichiers soient g�n�r�s dans le bon dossier. '*null*'si on est sur un site classique, *leNomDeLaMarqueBlanche* s'il s'agit d'une marque blanche.
     
     
 ## Plugins utilis�s fr�quemment
 
 1. Swiper peut ne pas fonctionner sur IE11. Pour cela :
    1. Installer es6-promise
    
        `npm install es6-promise --save`
    
        Dans le fichier `index.js`, `require('es6-promise').polyfill();`
   
        Dans le fichier de config Webpack, dans le plugins :  
        `new webpack.ProvidePlugin({
        Promise: 'es6-promise' }) `
    
    2. importer Swiper avec le path complet `import Swiper from 'swiper/dist/js/swiper.js';`
    
2. Flatpickr : afin de n'importer que les langues dont nous avons besoin, inclure la librairie comme cela :
    ``` 
    import flatpickr from 'flatpickr'; 
    import {French} from 'flatpickr/dist/l10n/fr.js';
    import {english} from 'flatpickr/dist/l10n/default';
    ```
    
    Pour installer le css n�cessaire : `@import url("~flatpickr/dist/flatpickr.min.css");`
    
   
    
