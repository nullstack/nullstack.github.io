import Nullstack from 'nullstack';
import Cog from 'poisonicon/cog/stroke';

class Loader extends Nullstack {
  
  render({network}) {
    if(!network.processing) return false;
    return (
      <div class="z12 fbl ftr xx y12 yy bgm1" style="opacity: 0.9">
        <Cog animation="spin" speed="slow" height={40} class="cm3" />
      </div>
    )
  }

}

export default Loader;