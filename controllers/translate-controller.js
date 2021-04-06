const axios = require('axios');

exports.translate = (req, res) => {

    const movies_link = req.search.movies.map((movie) => {
        return 'https://www.imdb.com/title/' + movie.id + '/releaseinfo';
    })

    axios.all(movies_link.map(l => axios.get(l)))
        .then(axios.spread((...htmls) => {

            const names = htmls.map((html) => {
                const title = html.data.match(/Brazil<\/td>.*\n.*aka-item__title">(.*)<\/td>/) ||
                    html.data.match(/\(original title\)<\/td>.*\n.*aka-item__title">(.*)<\/td>/) ||
                    html.data.match(/itemprop\=.url.\>(.*)\<\/a>/) ||
                    ''

                const id = html.data.match(/title\/(.*)\/releaseinfo/);

                return {
                    status: html.status,
                    title: title[1],
                    id: id[1],
                }
            })

            const movies = req.search.movies.map((movie) => {
                for (const namesKey in names) {
                    const name = names[namesKey];
                    if (movie.id === name.id) {
                        movie.title_br = name.title;
                        break;
                    }
                }
                return movie;
            })
            return res.status(200).send({q: req.search.q, movies})
        }))
}