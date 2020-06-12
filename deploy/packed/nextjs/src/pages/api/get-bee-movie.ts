import { NowRequest, NowResponse } from '@now/node';
import jetpack from 'fs-jetpack';
import cheerio from 'cheerio';
import got from 'got';

const htmlBeeMovie = 'https://web.njit.edu/~cm395/theBeeMovieScript/';

export default async (req: NowRequest, res: NowResponse) => {
    const response = await got(htmlBeeMovie);

    try {
        const $ = cheerio.load(response.body);
        const beeMovieText = $('body.parallax pre').text();
        jetpack.write('bee-movie-script.txt', beeMovieText);

        const beeMovieLines = beeMovieText.split('\n').filter((line) => line.length > 0);
        console.log(`Line count: ${beeMovieLines.length}`);

        const words = beeMovieLines.map((line) => line.split(' '));
        console.log(words);

        res.json(words);
    } catch (err) {
        console.log(err);
    }
}
