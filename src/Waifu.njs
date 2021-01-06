import Nullstack from 'nullstack';

class Waifu extends Nullstack {

  prepare({page, project}) {
    page.title = `Nulla-Chan - ${project.name}`;
    page.description = `Nullstack's official waifu`;
  }

  renderAttribute({label, value}) {
    return (
      <li class="xl m2b">
        <b>{label}</b>: {value}
      </li>
    )
  }
  
  render({worker}) {
    return (
      <div class="x md+p20t p10y sm-p2x"> 
        <div class="xx x12">
          {worker.online && <img src="/waifu.png" alt="Nulla-Chan" height="500" />}
          <div class="md+p10l">
            <h1 class="xl m20t"> Nulla <span class="ci1">-</span> Chan </h1>
            <p class="xl m8b"> Nullstack's official waifu </p>
            <ul>
              <Attribute label="🕐 Age" value="19" />
              <Attribute label="♒ Sign" value="Aquarius" />
              <Attribute label="🎂 Birthday" value="January 28" />
              <Attribute label="💖 Blood Type" value="A" />
              <Attribute label="📏 Height" value="1.55m" />
              <Attribute label="🍨 Fav Food" value="Anything vanilla flavored" />
              <Attribute label="🧩 Hobby" value="Reinventing Wheels" />
              <Attribute label="🎁 Neurodivergences" value="Asperger and ADHD" />
            </ul>
            <span class="xl m8t">
              🎨 Created by:
              <a href="https://www.instagram.com/biancazanette" target="_blank" rel="noopener" class="ci1 m2x"> Bilkaya </a>
            </span>
          </div>
        </div>
        <blockquote class="xx x12 m10y">
          <p class="x12"> A sweet and shy perfect waifu, is always hyperfocused in her studies but somehow distracted at the same time. </p>
          <p class="x12"> She is always cheerful... until she has to face glue code or sees a post telling her which tech she should use. </p>
        </blockquote>
      </div>
    )
  }

}

export default Waifu;