const open = document.querySelector('.container');
		const close = document.querySelector('.close');
		var tl = gsap.timeline({ defaults: { duration: 1, ease: 'expo.inOut' } });
		open.addEventListener('click', () => {
			if (tl.reversed()) {
				tl.play();
			} else {
				tl.to('nav', { right: 0 })
					.to('nav', { height: '100vh' }, '-=.1')
					.to('nav ul li a', { opacity: 1, pointerEvents: 'all', stagger: .2 }, '-=.8')
					.to('.close', { opacity: 1, pointerEvents: 'all' }, "-=.8")
					.to('nav h2', { opacity: 1 }, '-=1');
			}
		});

		close.addEventListener('click', () => {
			tl.reverse();
		});

		Vue.config.devtools = true;

		Vue.component('card', {
		  template: `
			<div class="card-wrap"
			  @mousemove="handleMouseMove"
			  @mouseenter="handleMouseEnter"
			  @mouseleave="handleMouseLeave"
			  ref="card">
			  <div class="card"
				:style="cardStyle">
				<div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
				<div class="card-info">
				  <slot name="header"></slot>
				  <slot name="content"></slot>
				</div>
			  </div>
			</div>`,
		  mounted() {
			this.width = this.$refs.card.offsetWidth;
			this.height = this.$refs.card.offsetHeight;
		  },
		  props: ['dataImage'],
		  data: () => ({
			width: 0,
			height: 0,
			mouseX: 0,
			mouseY: 0,
			mouseLeaveDelay: null
		  }),
		  computed: {
			mousePX() {
			  return this.mouseX / this.width;
			},
			mousePY() {
			  return this.mouseY / this.height;
			},
			cardStyle() {
			  const rX = this.mousePX * 30;
			  const rY = this.mousePY * -30;
			  return {
				transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
			  };
			},
			cardBgTransform() {
			  const tX = this.mousePX * -40;
			  const tY = this.mousePY * -40;
			  return {
				transform: `translateX(${tX}px) translateY(${tY}px)`
			  }
			},
			cardBgImage() {
			  return {
				backgroundImage: `url(${this.dataImage})`
			  }
			}
		  },
		  methods: {
			handleMouseMove(e) {
			  this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
			  this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
			},
			handleMouseEnter() {
			  clearTimeout(this.mouseLeaveDelay);
			},
			handleMouseLeave() {
			  this.mouseLeaveDelay = setTimeout(()=>{
				this.mouseX = 0;
				this.mouseY = 0;
			  }, 1000);
			}
		  }
		});
		
		const app = new Vue({
		  el: '#app'
		});