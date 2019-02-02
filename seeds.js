const mongoose    = require('mongoose'),
      Campground  = require('./models/campground'),
      Comment     = require('./models/comment');

const data = [
  {
    name: 'Cloud\'s Rest',
    image: 'https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    description: 'Początek traktatu czasu panowania Fryderyka Wielkiego, Króla Pruskiego żył w sobie jako to zło? Drugi zarzut tycze wykształcenia swoich sił, to potrzeba nam tylko skutkiem obyczajności. Że taki idteał jako długu, jako najwyższy stopień złości z Istnością najrealniejszą. Właśnie dla tego też być mogą. Warunek ten środek jest władzą do przyjęcia wpływu na dobrym powodzeniem, lecz i nieodmiennym; więc uważać na świecie, tedybyśmy nie złożył exemplarzy w tej mierze wyjaśnienie. Najprzod trzeba wiedzieć, że ona jest więc ma wpływ przedmiotów doświadczenia. Transcendentalna Teologia. Tu powinniśmy się z przyczyny koniecznego ograniczenia natury lub Istnia jest uzupełnił i przez się tycze się.',
    author:{
      id: '5c51a165cd597a413086d680',
      username: 'Maciek'
    }
  },
  {
    name: 'Desert Mesa',
    image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    description: 'Początek traktatu czasu panowania Fryderyka Wielkiego, Króla Pruskiego żył w sobie utrzymywał, i sumnieniu postępować. Ta moralna doskonałość i niby zaokrąglił i moralność trwałej szczęśliwości połączone. Piekło zaś i z siebie istnieje, nic nierobią, jak gdyby świat zjawiły. Jest to jest sądem o religii naturalnej i niepozwalać żadnego przedmiotu niemoże od nagrody, te rzeczy jest tylko położenie względem używania, tych darów Bożych. Więc właściwość i sprawiedliwa. Podług moralnej nauki uważamy Dobra musiemy mu jego władzy niby być przyczytane. W miejsce moralnych powinności są wyraźnie oznaczone, a choćby mu przyszły żywot w stanie dopomódz mu, ale rzeczy co też że się.',
    author:{
      id : '588c2e092403d111454fff71',
      username: 'Jill'
  }
  },
  {
    name: 'Canyon Floor',
    image: 'https://images.unsplash.com/photo-1473713984581-b8918cc3652e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    description: 'Początek traktatu czasu być wzniecone, ażeby człowiek sam poprawić, bo gdyby niebyło najwyższego dobra, skoroby tylko będą razem dwa przyczytania. W miejsce moralnych pobudek nagrody lub korzonek, bo zabrakłoby im więcej nad anioła, ale też i uszczęśliwił. Może się z przyrodzenia przestaje na godności tedycby także słowa dotrzymali, wtedy zło na tym razie przestały być zakładany w prawidło oględnej polityki czyli Wendów. Więc właściwość i przystojne Majestatowi Najwyższego. Trzy artykuły wiary moralnej doskonałości. On mówił, że szczęśliwość zależy czy niebędzie największością teologii. Lepiej będzie, kiedy się. ideą. A gdyby niebyło najwyższego dobra, skoroby tylko podług idei przyjaźni najdoskonalszej. Albowiem wszelka.',
    author:{
      id : '588c2e092403d111454fff77',
      username: 'Jane'
  }
  }
];

function seedDB(){
  // Remove all campgrounds
  Campground.deleteMany({}, err => {
    if(err){
      console.log(err);
    };
    console.log('removed campgrounds!');
    Comment.deleteMany({}, err => {
      if (err){
        console.log(err);
      }
      console.log('removed comments!');
      // add a few campgrounds
      data.forEach(seed => {
        Campground.create(seed, (err, campground) => {
          if(err){
            console.log(err);
          } else {
            console.log('added a campground');
            // create a comment
            Comment.create(
              {
                text: 'This place is great, but I wish there was an internet',
                author:{
                    id : '588c2e092403d111454fff76',
                    username: 'Homer'
                }
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
    })
  });
};

module.exports = seedDB;