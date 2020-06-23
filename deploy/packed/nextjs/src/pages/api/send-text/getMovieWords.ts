import jetpack from 'fs-jetpack';
import cheerio from 'cheerio';
import got from 'got';

export default async (contentUrl: string) => {
  try {
    const response = await got(contentUrl);

    const $ = cheerio.load(response.body);
    const beeMovieText = $('body.parallax pre').text();
    jetpack.write('bee-movie-script.txt', beeMovieText);

    const movieWords = beeMovieText
      .split(' ')
      .filter((word: string) => word.length > 0);

    return movieWords;
  } catch (err) {
    console.log(err);
  }
};
