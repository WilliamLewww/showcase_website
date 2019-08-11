const DEFAULT_RESOLUTION = [1000, 600];
const FONT_NAMES = { TIMES: 0, TIMES_SMALL: 1, TIMES_LARGE: 2 };
const SHADER_PROGRAM_NAMES = { GEOMETRY: 0, FONT: 1};

function Engine() {
	var gl;
	var shaderProgramList = [];
	var fontTextureList = [];

	var canvasSize = [0,0];
	var canvasScaleMin = [0];

	this.initialize = () => {
		gl = document.getElementById("gl-canvas").getContext("webgl");

		initializeShaders();
		initializeTextures();

		resizeCanvas();
		createListeners();

		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	}

	this.start = () => {
		update();
		render();

		requestAnimationFrame(this.start);
	}

	var update = () => {

	}

	var render = () => {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

	var initializeShaders = () => {
		for (var x = 0; x < SHADER_SOURCE.length / 2; x++) {
			shaderProgramList.push(createShaderProgram(SHADER_SOURCE[(x * 2) + 0], SHADER_SOURCE[(x * 2) + 1]));
		}
	}

	var createShaderProgram = (vertexSource, fragmentSource) => {
		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(vertexShader, vertexSource);
		gl.shaderSource(fragmentShader, fragmentSource);

		gl.compileShader(vertexShader);
		gl.compileShader(fragmentShader);

		var program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		return program;
	}

	var initializeTextures = () => {
		for (var x = 0; x < FONT_DATA.length; x++) {
			fontTextureList.push(createFontTexture("res/" + FONT_DATA[x].name + ".png"));
		}
	}

	var createFontTexture = (filepath) => {
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255,255,255,255]));

		var image = new Image();
		image.src = filepath;
		image.addEventListener("load", () => {
			gl.bindTexture(gl.TEXTURE_2D, texture);
		  	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
	  		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);

	  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	  		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		});

		return texture;
	}

	var resizeCanvas = () => {
		var canvasScaleWidth = (window.innerWidth / (DEFAULT_RESOLUTION[0] + 50));
		var canvasScaleHeight = (window.innerHeight / (DEFAULT_RESOLUTION[1] + 50));
		canvasScaleMin[0] = Math.min(canvasScaleWidth, canvasScaleHeight);

		if (canvasScaleMin[0] <= 1.0) {
			gl.canvas.width = (DEFAULT_RESOLUTION[0] * canvasScaleMin[0]);
			gl.canvas.height = (DEFAULT_RESOLUTION[1] * canvasScaleMin[0]);
		}
		else {
			canvasScaleMin[0] = 1.0;
			gl.canvas.width = DEFAULT_RESOLUTION[0];
			gl.canvas.height = DEFAULT_RESOLUTION[1];
		}

		canvasSize[0] = gl.canvas.width;
		canvasSize[1] = gl.canvas.height;
	}

	var createListeners = () => {
		window.addEventListener("resize", (event) => { resizeCanvas(); });
	}
}

function main() {
	var engine = new Engine();
	engine.initialize();
	engine.start();
}