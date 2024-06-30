import { parseFile } from 'music-metadata';

export const meta = async(filNam) => {
  try {
    const metadata = await parseFile(`./public/music/${filNam}`);
    let picFormat = metadata.common.picture[0].format;
    let picData = metadata.common.picture[0].data;
    const finalOutput = {
       file : filNam,
       duration : metadata.format.duration,
       title : metadata.common.title,
       album : metadata.common.album,
       artists : metadata.common.artists,
       artist : metadata.common.artist,
       picture : `data:${picFormat};base64,${picData.toString('base64')}`
    }
    return finalOutput;
  } catch (error) {
    console.error(error.message);
  }
}
