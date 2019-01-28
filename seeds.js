const mongoose    = require('mongoose'),
      Campground  = require('./models/campground'),
      Comment     = require('./models/comment');

const data = [
  {
    name: 'Cloud\'s Rest',
    image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    description: 'Początek traktatu czasu panowania Fryderyka Wielkiego, Króla Pruskiego żył w sobie jako to zło? Drugi zarzut tycze wykształcenia swoich sił, to potrzeba nam tylko skutkiem obyczajności. Że taki idteał jako długu, jako najwyższy stopień złości z Istnością najrealniejszą. Właśnie dla tego też być mogą. Warunek ten środek jest władzą do przyjęcia wpływu na dobrym powodzeniem, lecz i nieodmiennym; więc uważać na świecie, tedybyśmy nie złożył exemplarzy w tej mierze wyjaśnienie. Najprzod trzeba wiedzieć, że ona jest więc ma wpływ przedmiotów doświadczenia. Transcendentalna Teologia. Tu powinniśmy się z przyczyny koniecznego ograniczenia natury lub Istnia jest uzupełnił i przez się tycze się.'
  },
  {
    name: 'Desert Mesa',
    image: 'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
    description: 'Początek traktatu czasu panowania Fryderyka Wielkiego, Króla Pruskiego żył w sobie utrzymywał, i sumnieniu postępować. Ta moralna doskonałość i niby zaokrąglił i moralność trwałej szczęśliwości połączone. Piekło zaś i z siebie istnieje, nic nierobią, jak gdyby świat zjawiły. Jest to jest sądem o religii naturalnej i niepozwalać żadnego przedmiotu niemoże od nagrody, te rzeczy jest tylko położenie względem używania, tych darów Bożych. Więc właściwość i sprawiedliwa. Podług moralnej nauki uważamy Dobra musiemy mu jego władzy niby być przyczytane. W miejsce moralnych powinności są wyraźnie oznaczone, a choćby mu przyszły żywot w stanie dopomódz mu, ale rzeczy co też że się.'
  },
  {
    name: 'Canyon Floor',
    image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
    description: 'Początek traktatu czasu być wzniecone, ażeby człowiek sam poprawić, bo gdyby niebyło najwyższego dobra, skoroby tylko będą razem dwa przyczytania. W miejsce moralnych pobudek nagrody lub korzonek, bo zabrakłoby im więcej nad anioła, ale też i uszczęśliwił. Może się z przyrodzenia przestaje na godności tedycby także słowa dotrzymali, wtedy zło na tym razie przestały być zakładany w prawidło oględnej polityki czyli Wendów. Więc właściwość i przystojne Majestatowi Najwyższego. Trzy artykuły wiary moralnej doskonałości. On mówił, że szczęśliwość zależy czy niebędzie największością teologii. Lepiej będzie, kiedy się. ideą. A gdyby niebyło najwyższego dobra, skoroby tylko podług idei przyjaźni najdoskonalszej. Albowiem wszelka.'
  }
];

function seedDB(){
  // Remove all campgrounds
  Campground.deleteMany({}, err => {
    if(err){
      console.log(err);
    };
    console.log('removed campgrounds!');
    // add a few campgrounds
    data.forEach(seed => {
      Campground.create(seed, (err, campground) => {
        if(err){
          console.log(err);
        } else {
          console.log('added a campground');
          // create a comment
          Comment.create({
            text: 'This iplace is great, but I wish there was internet',
            author: 'Homer'
          }, (err, comment) => {
            if(err){
              console.log(err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log('Created new comment');
            };
          });
        };
      });
    });
    //add a few comments;
  });
};

module.exports = seedDB;