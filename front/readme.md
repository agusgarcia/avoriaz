# WEBPACK 4 

1. Pour installer les dépendances du projet (seulement la première fois) :

    `$ npm install`

    Si npm n'est pas reconnu en tant que commande interne, installer node et réessayer : 

    https://nodejs.org/en/download/
    
2. Pour mettre en route le dev-server :

    `$ cd front`
    
    `$ npm run start`

 3. Ouvrir http://localhost:8080/ si cela ne se fait pas automatiquement
 
 4. Pour modifier les fichiers source : modifier les fichiers du répertoire front/src (pour le CSS on utilise du SCSS, pour le JS, ES6). 
 
    La structure _classique_ d'un fichier JS est la suivante :
        
        // Import de plugins
        import $ from 'jquery'
        
        // Création de la classe 
        export default class Module {
            constructor() {
                // Initialisation des éléments
                this.initEls();
                // Initialisation des événements
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
                // Fonction à appeler lors de la création de la classe 'Module'
                this.initializeDatePicker();
                
                // Fonction à appeler lors du clic du $jqueryElement
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
            
        1. Dans listing.js (le module à exporter) :
        
        export default class Listing {
            constructor () {
                this.initEvents();
            }
            initEvents () {
                console.log('initEvents from listing.js');
            }
        }
    
        2. Dans index.js (le fichier où on veut importer le module) :
        
        // Dans initEls()
        this.$els.listing = $('.js-listing');
        
        // Dans launchPage() (appelé dans initEvents())
        if (this.$els.listing.length) {
            this.importListing();
        }
        
        importListing () {
            // /* webpackChunkName = "..." */ = nom du fichier js qui sera généré
            // Dans notre cas, le fichier js s'appellera listing.bundle.js 
            // (avec en préfixe le nom de la marque blanche + '-' si c'est le cas, 
            // par exemple : regionv2-listing.bundle.js)
            import(/* webpackChunkName: "listing" */ './listing.js').then(module => {
                const Listing = module.default;
                new Listing();
                // le console.log de listing.js devrait s'afficher dans la console du navigateur
            });
        }
       
 5. Pour générer les fichiers à mettre en prod (dans le répertoire /front) : 
 
     `$ npm run build`
     
     Le js sera généré dans le dossier /js, le css dans le dossier /css et les images dans le dossier /images.
     
     /!\ Penser à modifier la variable **MB** dans le fichier de prod de Webpack afin que les fichiers soient générés dans le bon dossier. '*null*'si on est sur un site classique, *leNomDeLaMarqueBlanche* s'il s'agit d'une marque blanche.
     
     
 ## Plugins utilisés fréquemment
 
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
    
    Pour installer le css nécessaire : `@import url("~flatpickr/dist/flatpickr.min.css");`
    
   
    
