const SHADER_SOURCE = [

// ==================================================================================
// GEOMETRY
[
'attribute vec2 position;								 											\n',
'														 											\n',
'uniform vec2 resolution;								 											\n',
'uniform float scaleWindow;								 											\n',
'														 											\n',
'void main(void) {										 											\n',
'	vec2 updatedPosition = position / resolution;													\n',
'	updatedPosition *= 2.0;																			\n',
'	gl_Position = vec4(updatedPosition * vec2(1, -1) * scaleWindow, 0, 1);	 						\n',
'}														 											\n',
].join(''),

[
'precision mediump float;									\n',
'															\n',
'uniform vec4 color;										\n',
'															\n',
'void main(void) {											\n',
'	gl_FragColor = color;									\n',
'}															\n',
].join(''),

// ==================================================================================
// FONT
[
'attribute vec2 position;								 											\n',
'attribute vec2 a_texture;																			\n',
'														 											\n',
'uniform vec2 resolution;								 											\n',
'uniform float scaleWindow;								 											\n',
'																									\n',
'varying vec2 v_texture;																			\n',
'														 											\n',
'void main(void) {										 											\n',
'	vec2 updatedPosition = position / resolution;													\n',
'	updatedPosition *= 2.0;																			\n',
'	gl_Position = vec4(updatedPosition * vec2(1, -1) * scaleWindow, 0, 1);	 						\n',
'																									\n',
'	v_texture = a_texture;																			\n',
'}														 											\n',
].join(''),

[
'precision mediump float;												\n',
'																		\n',
'varying vec2 v_texture;												\n',
'																		\n',
'uniform vec4 color;													\n',
'uniform sampler2D u_texture;											\n',
'																		\n',
'void main(void) {														\n',
'	gl_FragColor = texture2D(u_texture, v_texture) * color;				\n',
'}																		\n',
].join('')

];