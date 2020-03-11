<template>
  <div class="citySelect container">
    <div class="search">
      <div class="searchText">
        <input v-show='openStatu' id="input" placeholder="请输入出发城市" type="text" @input="handle">
      </div>
      <span class="cancel" @click='backPage'>取消</span>
    </div>
    <div class="hold">
      <scroll-view scroll-y="true" style="width: 100%;height:1070rpx;" @scroll="scroll" :scroll-into-view="cityLetter">
        <div class="cityList">
          <div class="openCity" v-show='openStatu' style="">开通城市</div>
          <div class='item' v-show='openStatu' v-for='(item, i) in openCityList' :key='i'>
            <h1 @click='cityChange(item)'>{{item.cityName}}</h1>
          </div>
          <div class="openCity" v-show='!openStatu' style="margin-bottom: 10px;">城市列表</div>
          <div class="cityAll" v-show='!openStatu'>
            <div class="item" style="padding: 0px;" v-for='(citys, key) in cityDataAll' :key='key'>
              <view :id="key" class="c_tit">{{key}}</view>
              <div class="clist">
                <h3 v-for="city in citys" :key='city.cityName' @click='cityChange(city)'>{{city.cityName}}</h3>
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    <div class="zimu" v-show='!openStatu'>
      <div class='sapn' v-for="(citys, key) in cityDataAll" :key="key" @click="tapMove(key)">{{key}}</div>
    </div>
    </div>
  </div>
</template>
<script>
import order from '../../services/order'
export default {
  data () {
    return {
      searchCityText: '',
      cityLetter: '',
      openStatu: false,
      openCityList: [],
      cityDataAll: []
    }
  },
  components: {},
  computed: {},
  methods: {
    handle (e) {
			this.searchCityText = e.detail.value
			order.getCityList(this)
    },
    backPage () {
      uni.navigateBack()
    },
    scroll () {
      this.cityLetter = ''
    },
    tapMove (val) {
			console.log(val)
      this.cityLetter = val
    },
    // 城市变化
    cityChange (item) {
      console.log(item)
      // 根据 url参数 改变上下车store
      if (this.openStatu === 1) {
        this.$store.dispatch('setUpCity', item)
        if (!this.$store.state.cityDown.cityName) {
          this.$store.dispatch('setDownCity', item)
        }
      } else {
        this.$store.dispatch('setDownCity', item)
      }
      this.backPage()
    }
  },
  onLoad: function (options) {
    console.log(options)
    this.openStatu = options.city === 'up' ? 1 : 0
  },
  mounted () {
    order.getCityList(this)
    let cityData = {'msg': '成功', 'code': 0, 'data': {'A': [{'centreLa': '41.1084800000', 'serviceStatus': 1, 'cityName': '鞍山', 'centreLo': '122.9943900000', 'id': 153}, {'centreLa': '36.0976700000', 'serviceStatus': 1, 'cityName': '安阳', 'centreLo': '114.3930000000', 'id': 254}, {'centreLa': '30.5429400000', 'serviceStatus': 1, 'cityName': '安庆', 'centreLo': '117.0635400000', 'id': 262}, {'centreLa': '26.2536700000', 'serviceStatus': 1, 'cityName': '安顺', 'centreLo': '105.9462000000', 'id': 358}, {'centreLa': '22.1868350000', 'serviceStatus': 1, 'cityName': '澳门', 'centreLo': '113.5430280000', 'id': 506}], 'B': [{'centreLa': '39.9078516257', 'serviceStatus': 1, 'cityName': '北京', 'centreLo': '116.4033651352', 'id': 44, 'regionNumber': '110000'}, {'centreLa': '38.8739600000', 'serviceStatus': 1, 'cityName': '保定', 'centreLo': '115.4645900000', 'id': 70}, {'centreLa': '21.4819240000', 'serviceStatus': 1, 'cityName': '北海', 'centreLo': '109.1204470000', 'id': 202}, {'centreLa': '40.7431700000', 'serviceStatus': 1, 'cityName': '巴彦淖尔', 'centreLo': '107.3877300000', 'id': 209}, {'centreLa': '25.1120500000', 'serviceStatus': 1, 'cityName': '保山', 'centreLo': '99.1618100000', 'id': 226}, {'centreLa': '32.9154800000', 'serviceStatus': 1, 'cityName': '蚌埠', 'centreLo': '117.3893200000', 'id': 236}, {'centreLa': '41.9441000000', 'serviceStatus': 1, 'cityName': '白山', 'centreLo': '126.4143300000', 'id': 244}, {'centreLa': '31.8513100000', 'serviceStatus': 1, 'cityName': '巴中', 'centreLo': '106.7689700000', 'id': 307}, {'centreLa': '40.6211600000', 'serviceStatus': 1, 'cityName': '包头', 'centreLo': '109.9534900000', 'id': 314}, {'centreLa': '34.3619400000', 'serviceStatus': 2, 'cityName': '宝鸡', 'centreLo': '107.2373200000', 'id': 331}, {'centreLa': '23.9021600000', 'serviceStatus': 1, 'cityName': '百色', 'centreLo': '106.6183800000', 'id': 349}, {'centreLa': '37.3821100000', 'serviceStatus': 1, 'cityName': '滨州', 'centreLo': '117.9727900000', 'id': 396}, {'centreLa': '33.8446100000', 'serviceStatus': 1, 'cityName': '亳州', 'centreLo': '115.7793100000', 'id': 494}], 'C': [{'centreLa': '30.5701516650', 'serviceStatus': 1, 'cityName': '成都', 'centreLo': '104.0647572802', 'id': 78}, {'centreLa': '28.2278802791', 'serviceStatus': 1, 'cityName': '长沙', 'centreLo': '112.9388311642', 'id': 80}, {'centreLa': '29.5626937950', 'serviceStatus': 1, 'cityName': '重庆', 'centreLo': '106.5517673008', 'id': 82}, {'centreLa': '43.8166600000', 'serviceStatus': 1, 'cityName': '长春', 'centreLo': '125.3236200000', 'id': 88}, {'centreLa': '31.8105808319', 'serviceStatus': 1, 'cityName': '常州', 'centreLo': '119.9741148219', 'id': 96}, {'centreLa': '22.4056600000', 'serviceStatus': 1, 'cityName': '崇左', 'centreLo': '107.3532500000', 'id': 221}, {'centreLa': '42.2578200000', 'serviceStatus': 1, 'cityName': '赤峰', 'centreLo': '118.8868600000', 'id': 231}, {'centreLa': '36.1958100000', 'serviceStatus': 1, 'cityName': '长治', 'centreLo': '113.1164900000', 'id': 267}, {'centreLa': '32.3018100000', 'serviceStatus': 1, 'cityName': '滁州', 'centreLo': '118.3168300000', 'id': 319}, {'centreLa': '25.7706300000', 'serviceStatus': 1, 'cityName': '郴州', 'centreLo': '113.0148500000', 'id': 335}, {'centreLa': '40.9528700000', 'serviceStatus': 1, 'cityName': '承德', 'centreLo': '117.9628600000', 'id': 344}, {'centreLa': '38.3044600000', 'serviceStatus': 1, 'cityName': '沧州', 'centreLo': '116.8388600000', 'id': 388}, {'centreLa': '25.0449500000', 'serviceStatus': 1, 'cityName': '楚雄', 'centreLo': '101.5276700000', 'id': 426}, {'centreLa': '30.6646900000', 'serviceStatus': 1, 'cityName': '池州', 'centreLo': '117.4914200000', 'id': 435}, {'centreLa': '23.6567000000', 'serviceStatus': 1, 'cityName': '潮州', 'centreLo': '116.6229600000', 'id': 453}, {'centreLa': '29.0315800000', 'serviceStatus': 1, 'cityName': '常德', 'centreLo': '111.6985400000', 'id': 483}, {'centreLa': '29.8578100000', 'serviceStatus': 1, 'cityName': '长寿区', 'centreLo': '107.0810500000', 'id': 522}], 'D': [{'centreLa': '38.9140147467', 'serviceStatus': 1, 'cityName': '大连', 'centreLo': '121.6146954508', 'id': 91}, {'centreLa': '23.0206700000', 'serviceStatus': 1, 'cityName': '东莞', 'centreLo': '113.7517900000', 'id': 119}, {'centreLa': '25.589449', 'serviceStatus': 1, 'cityName': '大理白族自治州', 'centreLo': '100.225668', 'id': 213}, {'centreLa': '24.4323200000', 'serviceStatus': 1, 'cityName': '德宏', 'centreLo': '98.5848600000', 'id': 287}, {'centreLa': '40.0006500000', 'serviceStatus': 1, 'cityName': '丹东', 'centreLo': '124.3543400000', 'id': 311}, {'centreLa': '37.453968', 'serviceStatus': 1, 'cityName': '德州', 'centreLo': '116.307428', 'id': 383}, {'centreLa': '31.2086400000', 'serviceStatus': 1, 'cityName': '达州', 'centreLo': '107.4679100000', 'id': 402}, {'centreLa': '46.5894680000', 'serviceStatus': 1, 'cityName': '大庆', 'centreLo': '125.1042340000', 'id': 410}, {'centreLa': '31.1267900000', 'serviceStatus': 1, 'cityName': '德阳', 'centreLo': '104.3979000000', 'id': 489}, {'centreLa': '40.0455430000', 'serviceStatus': 1, 'cityName': '敦煌', 'centreLo': '94.8103490000', 'id': 528}], 'E': [{'centreLa': '39.6086220000', 'serviceStatus': 1, 'cityName': '鄂尔多斯', 'centreLo': '109.7811110000', 'id': 264}, {'centreLa': '30.2721700000', 'serviceStatus': 1, 'cityName': '恩施', 'centreLo': '109.4881700000', 'id': 465}], 'F': [{'centreLa': '26.0741988587', 'serviceStatus': 1, 'cityName': '福州', 'centreLo': '119.2968774622', 'id': 97}, {'centreLa': '23.0217700000', 'serviceStatus': 1, 'cityName': '佛山', 'centreLo': '113.1219200000', 'id': 115}, {'centreLa': '27.9478100000', 'serviceStatus': 1, 'cityName': '抚州', 'centreLo': '116.3580900000', 'id': 238}, {'centreLa': '21.6871300000', 'serviceStatus': 1, 'cityName': '防城港', 'centreLo': '108.3547200000', 'id': 256}, {'centreLa': '32.8896300000', 'serviceStatus': 1, 'cityName': '阜阳', 'centreLo': '115.8149500000', 'id': 451}, {'centreLa': '29.7023900000', 'serviceStatus': 1, 'cityName': '涪陵', 'centreLo': '107.3877900000', 'id': 524}], 'G': [{'centreLa': '23.13', 'serviceStatus': 1, 'cityName': '广州', 'centreLo': '113.26', 'id': 67}, {'centreLa': '26.6474834693', 'serviceStatus': 1, 'cityName': '贵阳', 'centreLo': '106.6300316388', 'id': 123}, {'centreLa': '25.2353500000', 'serviceStatus': 1, 'cityName': '桂林', 'centreLo': '110.1797900000', 'id': 143}, {'centreLa': '32.4354900000', 'serviceStatus': 1, 'cityName': '广元', 'centreLo': '105.8435700000', 'id': 315}, {'centreLa': '25.8310900000', 'serviceStatus': 1, 'cityName': '赣州', 'centreLo': '114.9347600000', 'id': 323}, {'centreLa': '23.1130600000', 'serviceStatus': 1, 'cityName': '贵港', 'centreLo': '109.5976400000', 'id': 415}, {'centreLa': '30.4559600000', 'serviceStatus': 1, 'cityName': '广安', 'centreLo': '106.6332200000', 'id': 422}], 'H': [{'centreLa': '30.27', 'serviceStatus': 1, 'cityName': '杭州', 'centreLo': '120.15', 'id': 66}, {'centreLa': '36.626', 'serviceStatus': 1, 'cityName': '邯郸', 'centreLo': '114.536', 'id': 74}, {'centreLa': '31.8204433534', 'serviceStatus': 1, 'cityName': '合肥', 'centreLo': '117.2271389676', 'id': 93}, {'centreLa': '45.7423660000', 'serviceStatus': 1, 'cityName': '哈尔滨', 'centreLo': '126.6616650000', 'id': 94}, {'centreLa': '23.1107500000', 'serviceStatus': 1, 'cityName': '惠州', 'centreLo': '114.4167900000', 'id': 121}, {'centreLa': '20.0442200000', 'serviceStatus': 1, 'cityName': '海口', 'centreLo': '110.1998900000', 'id': 139}, {'centreLa': '27.5697400000', 'serviceStatus': 1, 'cityName': '怀化', 'centreLo': '110.0016000000', 'id': 215}, {'centreLa': '23.3642200000', 'serviceStatus': 1, 'cityName': '红河哈尼族彝族自治州', 'centreLo': '103.3756000000', 'id': 223}, {'centreLa': '23.7436500000', 'serviceStatus': 1, 'cityName': '河源', 'centreLo': '114.7006500000', 'id': 233}, {'centreLa': '26.8934610000', 'serviceStatus': 1, 'cityName': '衡阳', 'centreLo': '112.5718900000', 'id': 241}, {'centreLa': '35.7481000000', 'serviceStatus': 1, 'cityName': '鹤壁', 'centreLo': '114.2972300000', 'id': 259}, {'centreLa': '36.4820900000', 'serviceStatus': 1, 'cityName': '海东', 'centreLo': '102.4017300000', 'id': 292}, {'centreLa': '30.1995300000', 'serviceStatus': 1, 'cityName': '黄石', 'centreLo': '115.0389000000', 'id': 295}, {'centreLa': '30.4534700000', 'serviceStatus': 1, 'cityName': '黄冈', 'centreLo': '114.8723800000', 'id': 313}, {'centreLa': '33.9914100000', 'serviceStatus': 1, 'cityName': '淮北', 'centreLo': '116.8280300000', 'id': 321}, {'centreLa': '24.4034600000', 'serviceStatus': 1, 'cityName': '贺州', 'centreLo': '111.5665500000', 'id': 328}, {'centreLa': '37.7390300000', 'serviceStatus': 1, 'cityName': '衡水', 'centreLo': '115.6692200000', 'id': 346}, {'centreLa': '33.0678400000', 'serviceStatus': 1, 'cityName': '汉中', 'centreLo': '107.0319400000', 'id': 362}, {'centreLa': '35.4765222779', 'serviceStatus': 1, 'cityName': '韩城', 'centreLo': '110.4427744354', 'id': 380}, {'centreLa': '30.8930500000', 'serviceStatus': 1, 'cityName': '湖州', 'centreLo': '120.0880500000', 'id': 385}, {'centreLa': '29.7151700000', 'serviceStatus': 1, 'cityName': '黄山', 'centreLo': '118.3386600000', 'id': 403}, {'centreLa': '33.6101600000', 'serviceStatus': 1, 'cityName': '淮安', 'centreLo': '119.0159500000', 'id': 428}, {'centreLa': '35.2336300000', 'serviceStatus': 1, 'cityName': '菏泽', 'centreLo': '115.4811500000', 'id': 437}, {'centreLa': '24.6929100000', 'serviceStatus': 1, 'cityName': '河池', 'centreLo': '108.0854000000', 'id': 462}, {'centreLa': '49.1661200000', 'serviceStatus': 1, 'cityName': '呼伦贝尔', 'centreLo': '119.7787000000', 'id': 491}, {'centreLa': '40.8427230000', 'serviceStatus': 1, 'cityName': '呼和浩特', 'centreLo': '111.7484260000', 'id': 497}], 'J': [{'centreLa': '36.6679363414', 'serviceStatus': 1, 'cityName': '济南', 'centreLo': '117.0206381828', 'id': 87}, {'centreLa': '30.7463700000', 'serviceStatus': 1, 'cityName': '嘉兴', 'centreLo': '120.7555300000', 'id': 141}, {'centreLa': '29.7054800000', 'serviceStatus': 1, 'cityName': '九江', 'centreLo': '116.0014600000', 'id': 219}, {'centreLa': '35.415393', 'serviceStatus': 1, 'cityName': '济宁', 'centreLo': '116.587245', 'id': 229}, {'centreLa': '31.0354600000', 'serviceStatus': 1, 'cityName': '荆门', 'centreLo': '112.1994500000', 'id': 248}, {'centreLa': '23.5497200000', 'serviceStatus': 1, 'cityName': '揭阳', 'centreLo': '116.3727100000', 'id': 265}, {'centreLa': '35.2156300000', 'serviceStatus': 1, 'cityName': '焦作', 'centreLo': '113.2420100000', 'id': 274}, {'centreLa': '29.0781200000', 'serviceStatus': 1, 'cityName': '金华', 'centreLo': '119.6475900000', 'id': 333}, {'centreLa': '29.2686900000', 'serviceStatus': 1, 'cityName': '景德镇', 'centreLo': '117.1783900000', 'id': 353}, {'centreLa': '22.5786500000', 'serviceStatus': 1, 'cityName': '江门', 'centreLo': '113.0816100000', 'id': 377}, {'centreLa': '37.6874200000', 'serviceStatus': 1, 'cityName': '晋中', 'centreLo': '112.7527700000', 'id': 433}, {'centreLa': '30.3347900000', 'serviceStatus': 1, 'cityName': '荆州', 'centreLo': '112.2406900000', 'id': 442}, {'centreLa': '43.843577', 'serviceStatus': 1, 'cityName': '吉林', 'centreLo': '126.55302', 'id': 466}, {'centreLa': '27.1138200000', 'serviceStatus': 1, 'cityName': '吉安', 'centreLo': '114.9937600000', 'id': 480}], 'K': [{'centreLa': '24.87811', 'serviceStatus': 1, 'cityName': '昆明', 'centreLo': '102.83568', 'id': 95}, {'centreLa': '34.7972600000', 'serviceStatus': 1, 'cityName': '开封', 'centreLo': '114.3073100000', 'id': 417}], 'L': [{'centreLa': '39.5379100000', 'serviceStatus': 1, 'cityName': '廊坊', 'centreLo': '116.6835100000', 'id': 137}, {'centreLa': '36.0613800000', 'serviceStatus': 1, 'cityName': '兰州', 'centreLo': '103.8341700000', 'id': 145}, {'centreLa': '28.8717000000', 'serviceStatus': 1, 'cityName': '泸州', 'centreLo': '105.4425700000', 'id': 200}, {'centreLa': '27.6972800000', 'serviceStatus': 1, 'cityName': '娄底', 'centreLo': '111.9945800000', 'id': 216}, {'centreLa': '24.3254300000', 'serviceStatus': 1, 'cityName': '柳州', 'centreLo': '109.4155200000', 'id': 224}, {'centreLa': '28.4672000000', 'serviceStatus': 1, 'cityName': '丽水', 'centreLo': '119.9229300000', 'id': 234}, {'centreLa': '36.0882200000', 'serviceStatus': 1, 'cityName': '临汾', 'centreLo': '111.5196200000', 'id': 252}, {'centreLa': '34.5966900000', 'serviceStatus': 1, 'cityName': '连云港', 'centreLo': '119.2229500000', 'id': 268}, {'centreLa': '34.6181300000', 'serviceStatus': 1, 'cityName': '洛阳', 'centreLo': '112.4540200000', 'id': 305}, {'centreLa': '25.0750400000', 'serviceStatus': 1, 'cityName': '龙岩', 'centreLo': '117.0172200000', 'id': 322}, {'centreLa': '23.8842600000', 'serviceStatus': 1, 'cityName': '临沧', 'centreLo': '100.0888400000', 'id': 356}, {'centreLa': '27.8816400000', 'serviceStatus': 1, 'cityName': '凉山', 'centreLo': '102.2674600000', 'id': 372}, {'centreLa': '29.6441500000', 'serviceStatus': 1, 'cityName': '拉萨', 'centreLo': '91.1145000000', 'id': 392}, {'centreLa': '33.5814900000', 'serviceStatus': 1, 'cityName': '漯河', 'centreLo': '114.0168100000', 'id': 412}, {'centreLa': '31.7348800000', 'serviceStatus': 1, 'cityName': '六安', 'centreLo': '116.5232400000', 'id': 438}, {'centreLa': '35.1046500000', 'serviceStatus': 1, 'cityName': '临沂', 'centreLo': '118.3564600000', 'id': 455}, {'centreLa': '26.8545418910', 'serviceStatus': 1, 'cityName': '丽江', 'centreLo': '100.2260358256', 'id': 463}, {'centreLa': '36.4570200000', 'serviceStatus': 1, 'cityName': '聊城', 'centreLo': '115.9854900000', 'id': 468}, {'centreLa': '29.5554400000', 'serviceStatus': 1, 'cityName': '乐山', 'centreLo': '103.7612000000', 'id': 487}, {'centreLa': '23.7521000000', 'serviceStatus': 1, 'cityName': '来宾', 'centreLo': '109.2223800000', 'id': 503}, {'centreLa': '30.6737300000', 'serviceStatus': 1, 'cityName': '梁平区', 'centreLo': '107.8023500000', 'id': 520}], 'M': [{'centreLa': '24.2884400000', 'serviceStatus': 1, 'cityName': '梅州', 'centreLo': '116.1226400000', 'id': 289}, {'centreLa': '30.0756400000', 'serviceStatus': 1, 'cityName': '眉山', 'centreLo': '103.8485100000', 'id': 394}, {'centreLa': '31.4675100000', 'serviceStatus': 1, 'cityName': '绵阳', 'centreLo': '104.6796000000', 'id': 492}, {'centreLa': '21.6632900000', 'serviceStatus': 1, 'cityName': '茂名', 'centreLo': '110.9252300000', 'id': 498}], 'N': [{'centreLa': '32.05', 'serviceStatus': 1, 'cityName': '南京', 'centreLo': '118.79', 'id': 73}, {'centreLa': '28.6820020988', 'serviceStatus': 1, 'cityName': '南昌', 'centreLo': '115.8579354877', 'id': 89}, {'centreLa': '29.8600630808', 'serviceStatus': 1, 'cityName': '宁波', 'centreLo': '121.6242721236', 'id': 92}, {'centreLa': '22.8172322042', 'serviceStatus': 1, 'cityName': '南宁', 'centreLo': '108.3661739675', 'id': 99}, {'centreLa': '32.9906000000', 'serviceStatus': 1, 'cityName': '南阳', 'centreLo': '112.5283860000', 'id': 266}, {'centreLa': '31.9795800000', 'serviceStatus': 1, 'cityName': '南通', 'centreLo': '120.8937100000', 'id': 370}, {'centreLa': '26.6657100000', 'serviceStatus': 1, 'cityName': '宁德', 'centreLo': '119.5481900000', 'id': 452}, {'centreLa': '29.5801500000', 'serviceStatus': 1, 'cityName': '内江', 'centreLo': '105.0584400000', 'id': 467}, {'centreLa': '27.3317500000', 'serviceStatus': 1, 'cityName': '南平', 'centreLo': '118.1204300000', 'id': 472}, {'centreLa': '30.8373100000', 'serviceStatus': 1, 'cityName': '南充', 'centreLo': '106.1107300000', 'id': 481}], 'P': [{'centreLa': '25.4542100000', 'serviceStatus': 1, 'cityName': '莆田', 'centreLo': '119.0076700000', 'id': 220}, {'centreLa': '40.7194500000', 'serviceStatus': 1, 'cityName': '盘锦', 'centreLo': '122.1706800000', 'id': 239}, {'centreLa': '22.8252100000', 'serviceStatus': 1, 'cityName': '普洱', 'centreLo': '100.9662400000', 'id': 326}, {'centreLa': '27.6228900000', 'serviceStatus': 1, 'cityName': '萍乡', 'centreLo': '113.8542700000', 'id': 434}], 'Q': [{'centreLa': '36.0668880000', 'serviceStatus': 1, 'cityName': '青岛', 'centreLo': '120.3826650000', 'id': 83}, {'centreLa': '23.6820100000', 'serviceStatus': 1, 'cityName': '清远', 'centreLo': '113.0561500000', 'id': 302}, {'centreLa': '25.0898800000', 'serviceStatus': 1, 'cityName': '黔西南', 'centreLo': '104.9043700000', 'id': 310}, {'centreLa': '26.5836400000', 'serviceStatus': 1, 'cityName': '黔东南', 'centreLo': '107.9841600000', 'id': 318}, {'centreLa': '25.4900200000', 'serviceStatus': 1, 'cityName': '曲靖', 'centreLo': '103.7962500000', 'id': 375}, {'centreLa': '47.3543100000', 'serviceStatus': 1, 'cityName': '齐齐哈尔', 'centreLo': '123.9179600000', 'id': 382}, {'centreLa': '21.9797000000', 'serviceStatus': 1, 'cityName': '钦州', 'centreLo': '108.6543100000', 'id': 401}, {'centreLa': '28.9359200000', 'serviceStatus': 1, 'cityName': '衢州', 'centreLo': '118.8741900000', 'id': 446}, {'centreLa': '24.8740500000', 'serviceStatus': 1, 'cityName': '泉州', 'centreLo': '118.6758300000', 'id': 477}, {'centreLa': '39.8894400000', 'serviceStatus': 1, 'cityName': '秦皇岛', 'centreLo': '119.5177200000', 'id': 504}, {'centreLa': '28.9646300000', 'serviceStatus': 1, 'cityName': '綦江县', 'centreLo': '106.9285200000', 'id': 526}], 'R': [{'centreLa': '35.4164300000', 'serviceStatus': 1, 'cityName': '日照', 'centreLo': '119.5269100000 图吧地图：35.4154550300, 119.5178045500', 'id': 470}], 'S': [{'centreLa': '31.2303122784', 'serviceStatus': 1, 'cityName': '上海', 'centreLo': '121.4735623090', 'id': 79}, {'centreLa': '31.3010101173', 'serviceStatus': 1, 'cityName': '苏州', 'centreLo': '120.5888759003', 'id': 84}, {'centreLa': '41.6773171569', 'serviceStatus': 1, 'cityName': '沈阳', 'centreLo': '123.4654039512', 'id': 90}, {'centreLa': '38.0428824681', 'serviceStatus': 1, 'cityName': '石家庄', 'centreLo': '114.5145268184', 'id': 105}, {'centreLa': '22.5428664337', 'serviceStatus': 1, 'cityName': '深圳', 'centreLo': '114.0593690001', 'id': 111}, {'centreLa': '18.2527144203', 'serviceStatus': 1, 'cityName': '三亚', 'centreLo': '109.5116164132', 'id': 127}, {'centreLa': '32.6291800000', 'serviceStatus': 1, 'cityName': '十堰', 'centreLo': '110.7980100000', 'id': 203}, {'centreLa': '27.2389000000', 'serviceStatus': 1, 'cityName': '邵阳', 'centreLo': '111.4677000000', 'id': 227}, {'centreLa': '24.8103900000', 'serviceStatus': 1, 'cityName': '韶关', 'centreLo': '113.5972300000', 'id': 237}, {'centreLa': '26.2638500000', 'serviceStatus': 1, 'cityName': '三明', 'centreLo': '117.6392200000', 'id': 263}, {'centreLa': '31.6901300000', 'serviceStatus': 1, 'cityName': '随州', 'centreLo': '113.3826200000', 'id': 283}, {'centreLa': '30.0303300000', 'serviceStatus': 1, 'cityName': '绍兴', 'centreLo': '120.5802000000', 'id': 332}, {'centreLa': '22.7856600000', 'serviceStatus': 1, 'cityName': '汕尾', 'centreLo': '115.3751400000', 'id': 341}, {'centreLa': '28.4546300000', 'serviceStatus': 1, 'cityName': '上饶', 'centreLo': '117.9435700000', 'id': 350}, {'centreLa': '34.7726100000', 'serviceStatus': 1, 'cityName': '三门峡', 'centreLo': '111.2003000000', 'id': 366}, {'centreLa': '30.5328600000', 'serviceStatus': 1, 'cityName': '遂宁', 'centreLo': '105.5927300000', 'id': 389}, {'centreLa': '44.3065300000', 'serviceStatus': 1, 'cityName': '石河子', 'centreLo': '86.0789300000', 'id': 414}, {'centreLa': '27.3381700000', 'serviceStatus': 1, 'cityName': '昭通', 'centreLo': '103.7168000000', 'id': 440}, {'centreLa': '23.3535000000', 'serviceStatus': 1, 'cityName': '汕头', 'centreLo': '116.6822100000', 'id': 450}, {'centreLa': '34.4142700000', 'serviceStatus': 1, 'cityName': '商丘', 'centreLo': '115.6563500000', 'id': 458}, {'centreLa': '33.9619300000', 'serviceStatus': 1, 'cityName': '宿迁', 'centreLo': '118.2754900000', 'id': 484}], 'T': [{'centreLa': '37.8705709771', 'serviceStatus': 1, 'cityName': '太原', 'centreLo': '112.5507026141', 'id': 101}, {'centreLa': '39.0835667352', 'serviceStatus': 1, 'cityName': '天津', 'centreLo': '117.2006538610', 'id': 107}, {'centreLa': '39.6304500000', 'serviceStatus': 1, 'cityName': '唐山', 'centreLo': '118.1802200000', 'id': 250}, {'centreLa': '28.6564100000', 'serviceStatus': 1, 'cityName': '台州', 'centreLo': '121.4207600000', 'id': 355}, {'centreLa': '36.2000900000', 'serviceStatus': 1, 'cityName': '泰安', 'centreLo': '117.0870100000', 'id': 371}, {'centreLa': '43.6536100000', 'serviceStatus': 1, 'cityName': '通辽', 'centreLo': '122.2430400000', 'id': 436}, {'centreLa': '32.4554600000', 'serviceStatus': 1, 'cityName': '泰州', 'centreLo': '119.9255400000', 'id': 461}], 'W': [{'centreLa': '30.59', 'serviceStatus': 1, 'cityName': '武汉', 'centreLo': '114.30', 'id': 71}, {'centreLa': '31.4909565458', 'serviceStatus': 1, 'cityName': '无锡', 'centreLo': '120.3123795361', 'id': 85}, {'centreLa': '27.9945874016', 'serviceStatus': 1, 'cityName': '温州', 'centreLo': '120.6993997939', 'id': 113}, {'centreLa': '36.7074700000', 'serviceStatus': 1, 'cityName': '潍坊', 'centreLo': '119.1616700000', 'id': 157}, {'centreLa': '18.7752329185', 'serviceStatus': 1, 'cityName': '五指山', 'centreLo': '109.5169933937', 'id': 273}, {'centreLa': '43.8253100000', 'serviceStatus': 1, 'cityName': '乌鲁木齐', 'centreLo': '87.6167600000', 'id': 280}, {'centreLa': '23.3984900000', 'serviceStatus': 1, 'cityName': '文山', 'centreLo': '104.2150400000', 'id': 304}, {'centreLa': '37.5134800000', 'serviceStatus': 1, 'cityName': '威海', 'centreLo': '122.1217100000', 'id': 312}, {'centreLa': '23.4769100000', 'serviceStatus': 1, 'cityName': '梧州', 'centreLo': '111.2791700000', 'id': 368}, {'centreLa': '31.3524600000', 'serviceStatus': 1, 'cityName': '芜湖', 'centreLo': '118.4331300000', 'id': 490, 'regionNumber': '340200'}, {'centreLa': '30.8079000000', 'serviceStatus': 1, 'cityName': '万州区', 'centreLo': '108.4087300000', 'id': 512}], 'X': [{'centreLa': '24.479', 'serviceStatus': 1, 'cityName': '厦门', 'centreLo': '118.089', 'id': 72}, {'centreLa': '34.3412092171', 'serviceStatus': 1, 'cityName': '西安', 'centreLo': '108.9398697003', 'id': 81}, {'centreLa': '34.3299103325', 'serviceStatus': 1, 'cityName': '咸阳', 'centreLo': '108.7092761393', 'id': 125}, {'centreLa': '22.2774700000', 'serviceStatus': 1, 'cityName': '香港', 'centreLo': '114.1712000000', 'id': 149}, {'centreLa': '22.0092100000', 'serviceStatus': 1, 'cityName': '西双版纳傣族自治州', 'centreLo': '100.7970200000', 'id': 161}, {'centreLa': '34.0357000000', 'serviceStatus': 1, 'cityName': '许昌', 'centreLo': '113.8523300000', 'id': 204}, {'centreLa': '38.4167000000', 'serviceStatus': 2, 'cityName': '忻州', 'centreLo': '112.7341800000', 'id': 210}, {'centreLa': '36.6172900000', 'serviceStatus': 1, 'cityName': '西宁', 'centreLo': '101.7778200000', 'id': 218}, {'centreLa': '28.3117300000', 'serviceStatus': 1, 'cityName': '湘西', 'centreLo': '109.7389300000', 'id': 257}, {'centreLa': '30.9407800000', 'serviceStatus': 1, 'cityName': '宣城', 'centreLo': '118.7586600000', 'id': 308}, {'centreLa': '37.0705730000', 'serviceStatus': 1, 'cityName': '邢台', 'centreLo': '114.5049170000', 'id': 324}, {'centreLa': '30.9248300000', 'serviceStatus': 1, 'cityName': '孝感', 'centreLo': '113.9164500000', 'id': 342}, {'centreLa': '29.8412600000', 'serviceStatus': 1, 'cityName': '咸宁', 'centreLo': '114.3224500000', 'id': 352}, {'centreLa': '27.8297500000', 'serviceStatus': 1, 'cityName': '湘潭', 'centreLo': '112.9441100000', 'id': 360}, {'centreLa': '34.2044000000', 'serviceStatus': 1, 'cityName': '徐州', 'centreLo': '117.2857700000', 'id': 407}, {'centreLa': '32.1486200000', 'serviceStatus': 1, 'cityName': '信阳', 'centreLo': '114.0910500000', 'id': 423}, {'centreLa': '32.0098880000', 'serviceStatus': 1, 'cityName': '襄阳', 'centreLo': '112.1214630000', 'id': 459}, {'centreLa': '38.9999800000', 'serviceStatus': 1, 'cityName': '雄安', 'centreLo': '115.9780200000', 'id': 507}, {'centreLa': '35.3035450000', 'serviceStatus': 1, 'cityName': '新乡', 'centreLo': '113.9271360000', 'id': 510}, {'centreLa': '28.3274000000', 'serviceStatus': 1, 'cityName': '习水', 'centreLo': '106.2038500000', 'id': 540}], 'Y': [{'centreLa': '38.4864400000', 'serviceStatus': 1, 'cityName': '银川', 'centreLo': '106.2324800000', 'id': 151}, {'centreLa': '24.3518000000', 'serviceStatus': 1, 'cityName': '玉溪', 'centreLo': '102.5471400000', 'id': 235}, {'centreLa': '35.0262800000', 'serviceStatus': 1, 'cityName': '运城', 'centreLo': '111.0069900000', 'id': 243}, {'centreLa': '29.3556560000', 'serviceStatus': 1, 'cityName': '岳阳', 'centreLo': '113.1289910000', 'id': 253}, {'centreLa': '28.2601900000', 'serviceStatus': 1, 'cityName': '鹰潭', 'centreLo': '117.0691900000', 'id': 261}, {'centreLa': '43.9168900000', 'serviceStatus': 1, 'cityName': '伊犁', 'centreLo': '81.3241600000', 'id': 269}, {'centreLa': '30.6919000000', 'serviceStatus': 1, 'cityName': '宜昌', 'centreLo': '111.2864000000', 'id': 277}, {'centreLa': '32.3935800000', 'serviceStatus': 1, 'cityName': '扬州', 'centreLo': '119.4126900000', 'id': 285}, {'centreLa': '33.3495100000', 'serviceStatus': 1, 'cityName': '盐城', 'centreLo': '120.1616400000', 'id': 293}, {'centreLa': '30.0105300000', 'serviceStatus': 1, 'cityName': '雅安', 'centreLo': '103.0424000000', 'id': 301}, {'centreLa': '22.6545100000', 'serviceStatus': 1, 'cityName': '玉林', 'centreLo': '110.1809800000', 'id': 348}, {'centreLa': '26.4203400000, ', 'serviceStatus': 1, 'cityName': '永州', 'centreLo': '111.6122500000', 'id': 357}, {'centreLa': '40.6253700000', 'serviceStatus': 1, 'cityName': '营口', 'centreLo': '122.2194200000', 'id': 364}, {'centreLa': '28.7513000000', 'serviceStatus': 1, 'cityName': '宜宾', 'centreLo': '104.6417000000', 'id': 381}, {'centreLa': '22.9152500000', 'serviceStatus': 1, 'cityName': '云浮', 'centreLo': '112.0445300000', 'id': 448}, {'centreLa': '38.2852000000', 'serviceStatus': 1, 'cityName': '榆林', 'centreLo': '109.7345800000', 'id': 456}, {'centreLa': '28.5539100000', 'serviceStatus': 1, 'cityName': '益阳', 'centreLo': '112.3551600000', 'id': 464}, {'centreLa': '27.8144300000', 'serviceStatus': 1, 'cityName': '宜春', 'centreLo': '114.4161200000', 'id': 475}, {'centreLa': '37.4643900000', 'serviceStatus': 1, 'cityName': '烟台', 'centreLo': '121.4477500000', 'id': 486}, {'centreLa': '21.8582900000', 'serviceStatus': 1, 'cityName': '阳江', 'centreLo': '111.9825600000', 'id': 496}, {'centreLa': '36.5852900000', 'serviceStatus': 1, 'cityName': '延安', 'centreLo': '109.4897800000', 'id': 502}, {'centreLa': '29.3560000000', 'serviceStatus': 1, 'cityName': '永川', 'centreLo': '105.9270900000', 'id': 518}], 'Z': [{'centreLa': '22.2707701528', 'serviceStatus': 1, 'cityName': '珠海', 'centreLo': '113.5766357110', 'id': 103}, {'centreLa': '34.7471757197', 'serviceStatus': 1, 'cityName': '郑州', 'centreLo': '113.6253427788', 'id': 109}, {'centreLa': '22.5176942876', 'serviceStatus': 1, 'cityName': '中山', 'centreLo': '113.3927106508', 'id': 117}, {'centreLa': '24.5130954988', 'serviceStatus': 1, 'cityName': '漳州', 'centreLo': '117.6473744671', 'id': 129}, {'centreLa': '27.7254500000', 'serviceStatus': 1, 'cityName': '遵义', 'centreLo': '106.9272300000', 'id': 155}, {'centreLa': '23.0469000000', 'serviceStatus': 1, 'cityName': '肇庆', 'centreLo': '112.4652800000', 'id': 208}, {'centreLa': '40.7687900000', 'serviceStatus': 1, 'cityName': '张家口', 'centreLo': '114.8856000000', 'id': 225}, {'centreLa': '36.8131000000', 'serviceStatus': 1, 'cityName': '淄博', 'centreLo': '118.0548000000', 'id': 282}, {'centreLa': '32.1895900000', 'serviceStatus': 1, 'cityName': '镇江', 'centreLo': '119.4250000000', 'id': 306}, {'centreLa': '29.1166700000', 'serviceStatus': 1, 'cityName': '张家界', 'centreLo': '110.4783900000', 'id': 330}, {'centreLa': '30.1285900000', 'serviceStatus': 1, 'cityName': '资阳', 'centreLo': '104.6279800000', 'id': 378}, {'centreLa': '27.8276700000', 'serviceStatus': 1, 'cityName': '株洲', 'centreLo': '113.1339600000', 'id': 387}, {'centreLa': '29.9853900000', 'serviceStatus': 1, 'cityName': '舟山', 'centreLo': '122.2077800000', 'id': 395}, {'centreLa': '34.8100900000', 'serviceStatus': 1, 'cityName': '枣庄', 'centreLo': '117.3236100000', 'id': 439}, {'centreLa': '29.3392000000', 'serviceStatus': 1, 'cityName': '自贡', 'centreLo': '104.7784400000', 'id': 482}, {'centreLa': '33.0129400000', 'serviceStatus': 1, 'cityName': '驻马店', 'centreLo': '114.0222400000', 'id': 493}, {'centreLa': '33.6367040000', 'serviceStatus': 1, 'cityName': '周口', 'centreLo': '114.7014490000', 'id': 499}, {'centreLa': '21.270369', 'serviceStatus': 1, 'cityName': '湛江', 'centreLo': '110.357298', 'id': 508}, {'centreLa': '30.3002600000', 'serviceStatus': 1, 'cityName': '忠县', 'centreLo': '108.0376700000', 'id': 516}]}, 'time': 1569228716665}
    this.cityDataAll = cityData.data
  }
}
</script>
<style scoped>
.search {
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  -ms-flex-align: center;
  border-bottom: 1px solid #ff9d62;
  position: relative;
  padding: 14px;
  font-size: 14px;
  box-sizing: border-box;
}
.search .searchText {
    -ms-flex: 1;
    flex: 1;
}
.search .cancel {
    margin-left: 5px;
}
.hold {
    overflow: auto;
    width: 100%;
}
.hold .zimu {
    position: fixed;
    top: 56%;
    right: 0px;
    transform: translateY(-50%);
    z-index: 103;
}
.hold .zimu .sapn {
    display: block;
    padding: 1px 5px;
    text-align: center;
    color: #222;
    font-size: 14px;
}
.hold .cityList {
  box-sizing: border-box;
    overflow: auto;
    width: 100%;
    -ms-flex: 1;
    flex: 1;
    padding: 0 18px;
}
.hold .cityList .openCity {
  box-sizing: border-box;
  background: #eee;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333;
  padding: 10px;
}
.hold .cityList .item {
    padding: 10px 0;
    padding-left: 8px;
}
.hold .cityList .item .c_tit {
  box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    font-size: 14px;
    color: #333;
    height: 35px;
    line-height: 35px;
    background: #efefef;
    padding-left: 10px;
}
.hold .cityList .item h3 {
  box-sizing: border-box;
  width: 100%;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
    padding-left: 10px;
}
</style>
