const PORT = 3000

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');


const app = express()

const url = 'https://martinique.123-click.com/store/viandes-poissons'

axios(url)
    .then(response => {
        const htmlresp = response.data
        // console.log(htmlresp)
        const $ = cheerio.load(htmlresp)
        const articles = []
        
        $('div.productInList', htmlresp).each(function() {
            const nom = $(this).find('a').attr('title')
            const url = $(this).find('a').attr('href')
            const prix = $(this).find('p.price-full').text()
            const img = $(this).find('img.owl-lazy').attr('data-src')
            const quantite = $(this).find('div.desc-small-text').text()
            const quantite2 = $(this).find('div.poids-suffixe-holder').text().replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '')
            const prixunite = $(this).find('div.unity-price').text().replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '')
            // const prixunite2 = prixunite.replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', '')
            const nutriscore = $(this).find('div.picto-vignette-holder').find('img').attr('src')
            articles.push({
                nom,
                prix,
                quantite,
                quantite2,
                prixunite,
                // prixunite2,
                img,
                nutriscore,
                url,
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

