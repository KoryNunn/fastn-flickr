var fastn = require('./fastn');

var model = new fastn.Model({search: 'tree', images: []});

function refreshImages(){
    flickr.search(model.get('search'), 100)
    .then(function(newImages){
        model.update('images', newImages);
    });
}

function flickrImage(){
    return fastn('div', {class: 'flickr-image'},
        fastn('h1', fastn.binding('title')),
        fastn('div', {class: 'flickr-image-container'},
            fastn('img', {
                src: fastn.binding('imgUrl')
            })
        ),
        fastn('h2', fastn.binding('ownerName'), ' - ', fastn.binding('license')),
        fastn('h3', 'Last updated: ', 'cbfd doing moment'),
        fastn('a', {href:fastn.binding('flickrUrl')}, fastn.binding('flickrUrl'))
    ).binding('item');
}

var app = fastn('div',
    fastn('header',
        'Image Puller: Fastn Edition',
        fastn('input', {
            class: 'search',
            placeholder: 'search',
            value: fastn.binding('search'),
            onchange: 'value:value'
        }),
        fastn('button', {class: 'refresh'}, 'Refresh images')
            .on('click', refreshImages)
    ),
    fastn('main',
        fastn('list',{
            class: 'flickr-image-list',
            items: fastn.binding('images|*'),
            template: flickrImage
        })
    )
)
.attach(model)
.render();

window.addEventListener('load', function(){
    document.body.appendChild(app.element);
});