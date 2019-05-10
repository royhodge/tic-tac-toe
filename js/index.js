! function (Math) {

	"use strict";

	// ---- vec3 vector ----

	function vec3 (x, y, z) {
		var vec = new Float32Array([x || 0, y || 0, z || 0]);
		vec.transformMat4 = function(a, m) {
			var x = a[0], y = a[1], z = a[2],
			w = m[3] * x + m[7] * y + m[11] * z + m[15];
			w = w || 1.0;
			this[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
			this[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
			this[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
			return this;
		};
		Object.defineProperty(vec, "x", {
			get: function() { return this[0]; },
			set: function(x) { this[0] = x; }
		});
		Object.defineProperty(vec, "y", {
			get: function() { return this[1]; },
			set: function(y) { this[1] = y; }
		});
		Object.defineProperty(vec, "z", {
			get: function() { return this[2]; },
			set: function(z) { this[2] = z; }
		});
		return vec;
	}

	// ---- mat4 matrice ----

	function mat4 () {
		var mat = new Float32Array(16);
		mat.identity = function() {
			this[0] = 1;
			this[1] = 0;
			this[2] = 0;
			this[3] = 0;
			this[4] = 0;
			this[5] = 1;
			this[6] = 0;
			this[7] = 0;
			this[8] = 0;
			this[9] = 0;
			this[10] = 1;
			this[11] = 0;
			this[12] = 0;
			this[13] = 0;
			this[14] = 0;
			this[15] = 1;
			return this;
		};
		mat.rotateX = function (angle) {
			var s = Math.sin(angle),
			c = Math.cos(angle),
			a10 = this[4],
			a11 = this[5],
			a12 = this[6],
			a13 = this[7],
			a20 = this[8],
			a21 = this[9],
			a22 = this[10],
			a23 = this[11];
			this[4] = a10 * c + a20 * s;
			this[5] = a11 * c + a21 * s;
			this[6] = a12 * c + a22 * s;
			this[7] = a13 * c + a23 * s;
			this[8] = a20 * c - a10 * s;
			this[9] = a21 * c - a11 * s;
			this[10] = a22 * c - a12 * s;
			this[11] = a23 * c - a13 * s;
			return this;
		};
		mat.rotateY = function (angle) {
			var s = Math.sin(angle),
			c = Math.cos(angle),
			a00 = this[0],
			a01 = this[1],
			a02 = this[2],
			a03 = this[3],
			a20 = this[8],
			a21 = this[9],
			a22 = this[10],
			a23 = this[11];
			this[0] = a00 * c - a20 * s;
			this[1] = a01 * c - a21 * s;
			this[2] = a02 * c - a22 * s;
			this[3] = a03 * c - a23 * s;
			this[8] = a00 * s + a20 * c;
			this[9] = a01 * s + a21 * c;
			this[10] = a02 * s + a22 * c;
			this[11] = a03 * s + a23 * c;
			return this;
		};
		mat.multiply = function (a, b) {
			var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
			a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
			a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
			a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
			var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
			this[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
			this[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
			this[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
			this[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
			b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
			this[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
			this[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
			this[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
			this[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
			b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
			this[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
			this[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
			this[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
			this[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
			b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
			this[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
			this[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
			this[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
			this[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
			return this;
		};
		return mat;
	}

	// ---- game AI logic ----
	// adapted from TIC-TAC-TOE 3D Thierry and Eric Levy-Abegnoli
	// I.A. ON AMSTRAD CPC, PSI editions, 1986
	var machine = 1, human = 2, nul = 3, cellsPlayed = 0, end = 0, start = 1, dWin = 0;
	var inv = new Int32Array([0,2,1,6,8,7,3,5,4,18,20,19,24,26,25,21,23,22,9,11,10,15,17,16,12,14,13]);
	var sym = new Int32Array([0,9,18,0,12,21,0,15,24,1,0,19,4,0,22,7,0,25,2,11,0,5,14,0,8,17,0]);
	var pdiag = [], diag = [], diagm = new Int32Array(14), hdiag = new Int32Array(49), coeff = [], ndiag = new Int32Array(27), cell = new Int32Array(27), cij = new Int32Array([0,0,0]), memdiag = [new Int32Array(201), new Int32Array(201), new Int32Array(201)], value = new Int32Array(27);
	var value = new Int32Array([0,5,-5,17,10,3,-17,-3,-10,5,2,0,10,75002,0,-3,0,0,-5,0,-2,3,0,0,-10,0,-75002]);
	var s = [1,10,19,1,4,7,1,13,25,1,2,3,1,11,21,1,5,9,1,14,27,10,13,16,10,11,12,10,14,18,19,13,7,19,22,25,19,11,3,19,20,21,19,14,9,19,23,27,4,13,22,4,5,6,4,14,24,13,14,15,22,14,6,22,23,24,7,16,25,7,5,3,7,14,21,7,8,9,7,17,27,16,14,12,16,17,18,25,14,3,25,23,21,25,17,9,25,26,27,2,11,20,2,5,8,2,14,26,11,14,17,20,14,8,20,23,26,5,14,23,8,17,26,3,12,21,3,6,9,3,15,27,12,15,18,21,15,9,21,24,27,6,15,24,9,18,27], k = 0;
	for ( var id = 0; id < 49; id++ ) {
		pdiag[id] = new Int32Array(3);
		for ( var oc = 0; oc < 3; oc++ ) {
			pdiag[id][oc] = s[k++] - 1;
		}
	}
	for ( var p = 0; p < 27; p++ ) {
		var i = 0;
		for ( var id = 0; id < 49; id++ ) {
			for ( var oc = 0; oc < 3; oc++ ) {
				if ( pdiag[id][oc] !== p ) continue;
				if ( !diag[i] ) {
					diag[i] = new Int32Array(27);
					coeff[i] = new Int32Array(27);
				}
				diag[i][p] = id;
				coeff[i][p] = Math.pow(3, oc);
				i++;
			}
			ndiag[p] = i;
		}
	}

	// ---- save winning values ----

	function updateEnd (camp) {
		for( var i = 0; i < cij[camp]; i++) {
			var mem = memdiag[camp][i];
			value[inv[mem]]++;
			var mem1 = sym[inv[mem]];
			if ( mem1 ) value[mem1]++;
			value[mem]--;
			var mem2 = sym[mem];
			if ( mem2 ) value[mem2]--;
		}
	}

	// ---- reinit ----

	function reinit () {
		for ( var p = 0; p < 27; p++ ) {
			cell[p] = 0;
			spheres[p].s = 0;
		}
		for ( var d = 0; d < 49; d++ ) {
			hdiag[d] = 0;
		} 
		end = 0;
		cij[1] = 0;
		cij[2] = 0;
		cellsPlayed = 0;
		dWin = 0;
	}

	// ---- the end ----

	function manageEnd () {
		if ( end === nul ) message = "the game ended in a draw...";
		if ( end === machine ) message = "Machine wins";
		if ( end === human ) message = "Human wins";
		if ( end === human ) {
			updateEnd(end);
			updateEnd(3 - end);
		}
		if (dWin) dispWin(dWin);
	}

	// ---- machine IA minimax alpha-beta 2 levels ----

	function machinePlay () {
		var val0 = -100000, prevDiag, newDiag, bestMove;
		for ( var p0 = 0; p0 < 27; p0++ ) {
			if ( cell[p0] ) continue;
			var val2 = 0;
			for ( var i = 0; i < ndiag[p0]; i++ ) {
				prevDiag = hdiag[diag[i][p0]];
				newDiag  = prevDiag + coeff[i][p0];
				val2 = val2 - value[prevDiag] + value[newDiag];
				hdiag[diag[i][p0]] = newDiag;
				diagm[i] = prevDiag;
			}
			cell[p0] = machine;
			var valm = val2;
			if ( val2 > 50000 ) {
				returnToLevelZero( p0 );
				var move = updateGame( p0, machine );
				return move;
			}
			var val1 = 100000, fx = false;
			for ( var p1 = 0; p1 < 27; p1++ ) {
				if ( cell[p1] ) continue;
				val2 = valm;
				for ( var i = 0; i < ndiag[p1]; i++ ) {
					prevDiag = hdiag[diag[i][p1]];
					newDiag  = prevDiag + 2 * coeff[i][p1];
					val2 = val2 - value[prevDiag] + value[newDiag];
				}
				if ( val2 <= val0 ) {
					fx = true;
					break;
				}
				if ( val2 < val1 ) val1 = val2;
			}
			if ( !fx && val1 > val0 ) {
				val0 = val1;
				bestMove = p0;
			}
			returnToLevelZero( p0 );
		}
		var move = updateGame( bestMove, machine );
		return move;
	}

	// ---- return to level zero ----

	function returnToLevelZero ( p ) {
		cell[p] = 0;
		for ( var i = 0; i < ndiag[p]; i++ ) {
			hdiag[diag[i][p]] = diagm[i];
		}
	}

	// ---- display win diag ----

	function dispWin ( d ) {

		fSphere(pdiag[d][0]).s = 3;
		fSphere(pdiag[d][1]).s = 3;
		fSphere(pdiag[d][2]).s = 3;

	}

	// ---- update game ----

	function updateGame ( p, camp ) {
		for ( var i = 0; i < ndiag[p]; i++ ) {
			var d = diag[i][p];
			hdiag[d] += coeff[i][p] * camp;
			memdiag[camp][cij[camp]] = hdiag[d];
			cij[camp]++;
			if ( hdiag[d] === 13 ) {
				end = machine;
				dWin = d;
			}
			if ( hdiag[d] === 26 ) {
				end = human;
				dWin = d;
			}
		}
		cell[p] = camp;
		cellsPlayed++;
		if ( cellsPlayed === 27 ) end = nul;
		return p;
	}
	
	// ---- write ----
	
	function writeMessage () {
		ctx.font = "30px Codystar";
		ctx.fillStyle = "#fff";
		ctx.textAlign = "center";
		ctx.fillText(message, canvas.width / 2, canvas.height / 8); 
	}

	// ---- 3D spheres ----

	var spheres = [], over, dx = 0, dy = 0, message = "";
	var fillColor = ["","#0f0", "#f00", "#fff"];

	function run () {
		requestAnimationFrame(run);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (pointer.isDown) {
			dx -= (pointer.x - pointer.xb) * 0.001;
			dy += (pointer.y - pointer.yb) * 0.001;
		}
		dx *= 0.9;
		dy *= 0.9;
		camera.update(dy, dx);
		spheres.forEach(
			function (sphere) {
				sphere.project();
			}
		);
		spheres.sort(
			function (p0, p1) {
				return p1.zIndex - p0.zIndex;
			}
		);
		spheres.forEach(
			function (sphere) {
				sphere.draw();
			}
		);
		if ( message ) writeMessage();
		pointer.xb = pointer.x;
		pointer.yb = pointer.y;
	}

	// ---- camera ----

	var camera = {
		mvMatrix: mat4().identity(),
		currentRotationMatrix: mat4().identity(),
		newRotationMatrix: mat4().identity(),
		update: function (deltaX, deltaY) {
			this.newRotationMatrix.identity().rotateX(deltaX).rotateY(deltaY);
			this.currentRotationMatrix.multiply(this.newRotationMatrix, this.currentRotationMatrix);
			this.mvMatrix.identity().multiply(this.mvMatrix, this.currentRotationMatrix);
		}
	};

	// ---- sphere constructor ----

	var Sphere = function (id, x, y, z, w) {
		var s = canvas.width / 3;  
		this.id     = id;
		this.width  = w;
		this.coord  = vec3((x - 1) * s, (y - 1) * s, (z - 1) * s);
		this.p2d    = vec3();
		this.x      = 0;
		this.y      = 0;
		this.w      = 0;
		this.s      = 0;
		this.zIndex = 0;
	}

	// ---- project sphere ----

	Sphere.prototype.project = function () {
		this.p2d.transformMat4(this.coord, camera.mvMatrix);
		this.zIndex = this.p2d.z;
		var p = 400 / (800 + this.p2d.z);
		this.x = (canvas.width  * 0.5) + this.p2d.x * p;
		this.y = (canvas.height * 0.5) + this.p2d.y * p;
		this.w = p * this.width;
	};

	// ---- draw sphere ----

	Sphere.prototype.draw = function () {
		if ( end && !this.s ) return;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
		ctx.fillStyle = "#000";
		ctx.fillStyle = fillColor[this.s];
		ctx.strokeStyle = '#666';
		ctx.fill();
		ctx.stroke();
	};

	// ---- set canvas ----

	var canvas = {  
		width:  0, 
		height: 0,
		rx: 1,
		ry: 1,
		elem: document.createElement('canvas'),
		resize: function () {
			var o = this.elem;
			this.offsetWidth = this.elem.offsetWidth * 1;
			this.offsetHeight = this.elem.offsetHeight * 1;
			if (this.width) {
				this.rx = this.width / this.offsetWidth;
				this.ry = this.height / this.offsetHeight;
			}
			for (this.left = 0, this.top = 0; o != null; o = o.offsetParent) {
				this.left += o.offsetLeft;
				this.top  += o.offsetTop;
			}
		},
		init: function () {
			var ctx = this.elem.getContext('2d');
			document.body.appendChild(this.elem);
			this.resize();
			this.width = this.elem.width = this.offsetWidth;
			this.height = this.elem.height = this.offsetHeight;
			window.addEventListener('resize', canvas.resize.bind(canvas), false);
			return ctx;
		}
	};
	var ctx = canvas.init();

	// ---- set pointer ----

	var pointer = (function (canvas) {
		var pointer = {
			x: 0, 
			y: 0,
			canvas: canvas,
			touchMode: false,
			isDown: false,
			draging: false,
			xb: 0,
			yb: 0
		};
		[[window, 'mousemove,touchmove', function (e) {
			this.touchMode = e.targetTouches;
			if (this.touchMode) e.preventDefault();
			var pointer = this.touchMode ? this.touchMode[0] : e;
			this.x = (pointer.clientX - this.canvas.left) * this.canvas.rx;
			this.y = (pointer.clientY - this.canvas.top) * this.canvas.ry;
			if (this.isDown) this.draging = true;
		}],
		[canvas.elem, 'mousedown,touchstart', function (e) {
			this.touchMode = e.targetTouches;
			if (this.touchMode) e.preventDefault();
			var pointer = this.touchMode ? this.touchMode[0] : e;
			this.xb = this.x = (pointer.clientX - this.canvas.left) * this.canvas.rx;
			this.yb = this.y = (pointer.clientY - this.canvas.top) * this.canvas.ry;
			this.isDown = true;
			setTimeout(function () {
				if (!this.isDown && Math.abs(this.xb - this.x) < 11 && Math.abs(this.yb - this.y) < 11) {
					this.click(e);
				}
			}.bind(this), 200);
		}],
		[window, 'mouseup,touchend,touchcancel', function (e) {
			e.preventDefault();
			this.isDown = false;
			this.draging = false;
		}]].forEach(function (e) {
			for (var i = 0, events = e[1].split(','); i < events.length; i++) {
				e[0].addEventListener(events[i], e[2].bind(pointer), false );
			}
		}.bind(pointer));
		return pointer;
	}(canvas));

	// ---- init spheres ----

	var k = 0;
	for ( var z = 0; z < 3; z++ ) {
		for ( var y = 2; y >= 0; y-- ) {
			for ( var x = 0; x < 3; x++ ) {
				spheres.push( new Sphere (k++, x, y, z, canvas.width / 10) );
			}
		}
	}

	// ---- find sphere ----

	function fSphere ( id ) {
		var m = spheres.find(function (s) {
			return s.id === id;
		});
		return m;
	}

	// ---- click sphere ----

	pointer.click = function () {
		if ( end ) {
			reinit();
			start = - start;
			if (start < 0) {
				message = "Machine started"
				var move = machinePlay();
				fSphere(move).s = machine;
				return;
			}
		}
		message = "";
		var over = null;
		spheres.forEach(
			function (sphere) {
				var dx = pointer.x - sphere.x,
				dy = pointer.y - sphere.y;
				if (Math.sqrt(dx * dx + dy * dy) < sphere.w)  over = sphere;
			}
		);
		if ( over && over.s === 0 ) {
			over.s = human;
			var move = updateGame( over.id, human );
			if (end) manageEnd();
			else {
				move = machinePlay();
				fSphere(move).s = machine;
				if (end) manageEnd();
			}
		}
	}
	run();
} (Math);