(this["webpackJsonppetful-client"]=this["webpackJsonppetful-client"]||[]).push([[0],{23:function(e,t,n){e.exports=n(40)},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){e.exports=n.p+"static/media/catanddog.0b68c05b.jpg"},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(19),c=n.n(r),i=n(13),s=(n(28),n(3)),l=n(4),u=n(6),p=n(5),h=n(7),d=n(10),m=(n(29),function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).handleClickAdoption=function(){n.props.history.push("/adopt")},n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"LandingPage"},o.a.createElement("div",{className:"LandingPage__title"},o.a.createElement("h1",null,"Welcome to Petful!")),o.a.createElement("div",{className:"LandingPage__summary"},o.a.createElement("p",null,"Hello! Petful is here to help you find the best pet for you. We offer a selection of wonderful cats and dogs. On our website you will be able to see a slection between a beautiful cat or a friendly dog. People must queue up and wait for their turn in order to adopt a pet of their own. We serve on a first come and first served basis so line up today to get a new addition to your family!")),o.a.createElement("div",{className:"LandingPage__adopt"},o.a.createElement("button",{type:"button",className:"button",onClick:this.handleClickAdoption},"Start your adoption")),o.a.createElement("br",null),o.a.createElement("img",{className:"LandingPage__image",src:n(30),alt:"cat-with-dog-img"}))}}]),t}(a.Component));m.defaultPorps={history:{push:function(){}}};var f=m,j=n(22),b=(n(31),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"IndividualPet"},o.a.createElement("p",{className:"IndividualPet__title"},"Available for adoption:"),o.a.createElement("br",null),o.a.createElement("img",{src:this.props.pet.imageURL,alt:"pic"}),o.a.createElement("div",{className:"IndividualPet__summary"},o.a.createElement("p",null,"Name: Hello, My name is ","".concat(this.props.pet.name)),o.a.createElement("p",null,"Age: I am ","".concat(this.props.pet.age)," years old"),o.a.createElement("p",null,"Breed: ","".concat(this.props.pet.breed)),o.a.createElement("p",null,"Description: ","".concat(this.props.pet.description)),o.a.createElement("p",null,"This is my Story: ","".concat(this.props.pet.story))),o.a.createElement("button",{onClick:function(){return e.props.handleAdoptClick(e.props.type)},disabled:this.props.canAdopt},"Adopt"))}}]),t}(a.Component));b.defaultProps={pet:{name:"",age:"",breed:"",description:"",gender:"",imageURL:"",story:""}};var E=b,g=(n(32),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"WaitingList"},o.a.createElement("form",{onSubmit:this.props.handleClickSubmit},o.a.createElement("h5",null,"Enter Your Name Below"),o.a.createElement("input",{type:"text",id:"user_name",value:this.props.name,onChange:function(t){return e.props.updateUserName(t.target.value)}}),o.a.createElement("br",null),o.a.createElement("button",{type:"submit",className:"WaitingList__joinButton",disabled:this.props.waiting},"Join the waiting list!")),o.a.createElement("br",null),o.a.createElement("ul",null,o.a.createElement("h4",null,"People waiting to adopt a pet "),this.props.people.map((function(e,t){return o.a.createElement("li",{key:t},e)}))))}}]),t}(a.Component)),y=(n(33),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"Process"},this.props.atFront&&!1===this.props.adoptionMessage&&o.a.createElement("h2",{className:"Process__hidden"},"Your turn! Choose a pet."),this.props.adoptionMessage&&o.a.createElement("h2",{className:"Process__hidden"},"Congratulations, You have adopted a pet!"),this.props.inLine&&o.a.createElement("h2",{className:"Process__hidden"},"Please wait..."))}}]),t}(a.Component)),v="https://apricot-cake-94060.herokuapp.com/api",k=["Harry Potter","Frederica Kohlmeier","Dwain Segraves","Tisha Reimer","Lavera Hiltz","Cinderella Heth","Pilar Cadena","Trudi Arrant","Tera Snipe","Elias Beery","Valentine Coughlin"],P=(n(34),function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={pets:{cat:[],dog:[]},canAdopt:!0,adoptionMessage:!1,people:[],name:"",waiting:!1,inLine:!1,atFront:!1,error:null},n.fillQueue=function(){n.interval=setInterval((function(){var e=k[Math.floor(Math.random()*k.length)];fetch("".concat(v,"/people"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name:e})}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(){fetch("".concat(v,"/people"),{headers:{}}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.error(e)})).then((function(e){n.setState({people:e}),5===n.state.people.length&&(n.setState({adoptionMessage:!0}),clearInterval(n.interval))})).catch((function(e){return n.setState({error:e})}))}))}),5e3)},n.handleAdoptClick=function(e){n.setState({adoptionMessage:!0}),setTimeout((function(){fetch("".concat(v,"/pets"),{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({type:e})}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(){fetch("".concat(v,"/pets")).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.error(e)})).then((function(e){n.setState({pets:e})})).catch((function(e){return n.setState({error:e})}))})).then((function(){fetch("".concat(v,"/people"),{method:"DELETE"}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(){fetch("".concat(v,"/people"),{headers:{}}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.error(e)})).then((function(e){n.setState({people:e,name:"",adoptionMessage:!0,canAdopt:!0,waiting:!0,atFront:!1})})).catch((function(e){n.setState({error:e})}))}))}))}),3e3)},n.updateUserName=function(e){n.setState({name:e})},n.UpdateWaitingList=function(e){n.setState({people:[].concat(Object(j.a)(n.state.people),[e])})},n.dequeuePet=function(){var e=["cat","dog"],t=e[Math.floor(Math.random()*e.length)];fetch("".concat(v,"/pets"),{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({type:t})}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(){fetch("".concat(v,"/pets")).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.error(e)})).then((function(e){n.setState({pets:e})})).catch((function(e){return n.setState({error:e})}))}))},n.moveQueue=function(){n.interval=setInterval((function(){fetch("".concat(v,"/people"),{method:"DELETE"}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(){n.dequeuePet()})).then((function(){fetch("".concat(v,"/people"),{headers:{}}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.error(e)})).then((function(e){n.setState({people:e}),e[0]===n.state.name&&(n.setState({canAdopt:!1,atFront:!0,inLine:!1}),clearInterval(n.interval),n.fillQueue())})).catch((function(e){return n.setState({error:e})}))}))}),5e3)},n.handleClickSubmit=function(e){e.preventDefault();var t=n.state.name;fetch("".concat(v,"/people"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name:t})}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then(fetch("".concat(v,"/people"),{headers:{}}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.error(e)})).then((function(e){return n.setState({people:e,waiting:!0,inLine:!0})}))).catch((function(e){n.setState({error:e.error})})),n.moveQueue()},n}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("".concat(v,"/pets")).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.error(e)})).then((function(t){e.setState({pets:t})})).catch((function(t){return e.setState({error:t})})),fetch("".concat(v,"/people"),{headers:{}}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).catch((function(e){return console.error(e)})).then((function(t){return e.setState({people:t})}))}},{key:"render",value:function(){return o.a.createElement("div",{className:"Adopt"},o.a.createElement("h1",null," Adopt a Pet "),o.a.createElement("br",null),o.a.createElement("p",null,"Join the waiting list below. When it is your turn choose from one of the two pets displayed."),o.a.createElement("br",null),o.a.createElement(y,{atFront:this.state.atFront,adoptionMessage:this.state.adoptionMessage,inLine:this.state.inLine}),o.a.createElement(g,{people:this.state.people,name:this.state.name,waiting:this.state.waiting,updateUserName:this.updateUserName,handleClickSubmit:this.handleClickSubmit}),o.a.createElement("div",{className:"Adopt__position"},o.a.createElement(E,{handleAdoptClick:this.handleAdoptClick,pet:this.state.pets.dog[0],type:"dog",canAdopt:this.state.canAdopt}),o.a.createElement("h2",null,"OR "),o.a.createElement(E,{handleAdoptClick:this.handleAdoptClick,pet:this.state.pets.cat[0],type:"cat",canAdopt:this.state.canAdopt})))}}]),t}(a.Component)),O=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement(i.a,null,o.a.createElement("div",{className:"app"},o.a.createElement(d.c,null,o.a.createElement(d.a,{exact:!0,path:"/",component:f}),o.a.createElement(d.a,{path:"/adopt",component:P}))))}}]),t}(a.Component);c.a.render(o.a.createElement(i.a,null,o.a.createElement(O,null)),document.getElementById("root"))}},[[23,1,2]]]);
//# sourceMappingURL=main.2f1b9256.chunk.js.map