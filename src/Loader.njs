import Nullstack from 'nullstack';
import Cog from 'poisonicon/cog/stroke';

class Loader extends Nullstack {
  
  render({worker}) {
    if(!worker.fetching) return false;
    return (
      <div class="z24 pftl xx yy x12 xvw y12 yvh bgm1 op18">
        <Cog animation="spin" speed="slow" height={40} class="cm3" />
      </div>
    )
  }

}

export default Loader;