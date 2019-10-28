(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  var scale = 0;
  var adder = 0.0088;

  var tambahX = 0.05;
  var tambahY = 0.05;
  var tambahZ = 0.05;
  var translate = [0.0, 0.0, 0.0];

  var canvas = document.getElementById("glcanvas");
  var gl = glUtils.checkWebGL(canvas);

  function main() {
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
        fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
        fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
    init1()
  }

  function init1() {

      clear();
      drawTri(gl.TRIANGLE_STRIP,1,program2)
      drawLine(program)
      requestAnimationFrame(init1); 
  }

  function clear()
  {
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
  }

  function drawLine(program) {
    var n = initBuffersLine(program);
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(gl.LINES, 0, n);
  }

  
  function drawTri(type, mode, program) {

    var n = initBuffersTri(mode, program);
    if (n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;
    }
    gl.drawArrays(type, 0, n);
  }

  function initBuffersLine(program) {

    var cubeVertices = [
      // x, y, z      r, g, b
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0, //BAD BDC MERAH DEPAN //keempat ganti sama kedua
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,// Pertama dan terakhir ditambah diakhir
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0,

      0.5,  0.5,  0.5,   1.0, 1.0, 1.0, //CDH CHG HIJAU KANAN
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   1.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  0.5,   1.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   1.0, 1.0, 1.0,

      0.5, -0.5,  0.5,   0.0, 1.0, 1.0, //DAE DEH BIRU BAWAH
      -0.5, -0.5, 0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   0.0, 1.0, 1.0,

      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0, //EFG EGH KUNING BELAKANG
      -0.5, 0.5,  -0.5,   0.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  -0.5,   0.0, 1.0, 1.0,
      0.5,  0.5,  -0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      0.5, -0.5,  -0.5,   0.0, 1.0, 1.0,

      -0.5, 0.5,  -0.5,   0.0, 1.0, 1.0, //FEA FAB CYAN KIRI
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,
      -0.5, -0.5, 0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  -0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   0.0, 1.0, 1.0,

       0.5,  0.5, -0.5,  0.0, 1.0, 1.0, //GFB GBC MAGENTA ATAS
      -0.5, 0.5,  -0.5,  0.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
      -0.5, 0.5,  -0.5,  0.0, 1.0, 1.0,
      -0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
       0.5, 0.5,  0.5,   0.0, 1.0, 1.0,
       0.5,  0.5, -0.5,  0.0, 1.0, 1.0,
       0.5, 0.5,  0.5,   0.0, 1.0, 1.0,

    ];

    n = cubeVertices.length/6;
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    

        gl.vertexAttribPointer(
          vPosition,  // variabel yang memegang posisi attribute di shader
          3,          // jumlah elemen per attribute
          gl.FLOAT,   // tipe data atribut
          gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
          0                                   // offset dari posisi elemen di array
        );
        
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
          6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

        var thetaLoc = gl.getUniformLocation(program, 'theta');
        var theta = [-20.0, 40.0, 0.0];

        gl.uniform3fv(thetaLoc, theta);


    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
    return n;
  }

  function initBuffersTri(mode, program) {
    var n;
    var triangleVertices = new Float32Array([
      -0.3,+0.0,   1.0,1.0,0.0,
      -0.2,+0.1,   0.7,0.0,1.0,
      +0.2,+0.0,    0.1,1.0,0.6,
      +0.12,+0.1,  1.0,1.0,0.0,
      +0.4,+0.3,    0.7,0.0,1.0,
      +0.2,+0.2,   0.1,1.0,0.6,
      +0.1,+0.3,  1.0,1.0,0.0,
      -0.1,+0.2,   0.7,0.0,1.0,
      +0.2,+0.4,   0.1,1.0,0.6,
      +0.2,+0.5,  1.0,1.0,0.0,
      +0.5,+0.4,   0.7,0.0,1.0,
      +0.55,+0.5, 0.1,1.0,0.6,
    ]);

      n = triangleVertices.length/5

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');

    var scaleLocation = gl.getUniformLocation(program, 'scale');
    gl.uniform1f(scaleLocation, scale);
    if (scale > 1){
      adder = -0.0088
    }
    else if (scale < -1){
      adder = 0.0088
    }
    scale += adder;
    
        
    gl.vertexAttribPointer(
    vPosition, // Variable yang memegang posisi atribut di shader
    2, // Jumlah element per attribut
    gl.FLOAT, // tipe data attribut
    gl.FALSE, 
    5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
    0 //offset dari posisi elemen di array
    );
    
    gl.vertexAttribPointer(
    vColor,
    3,
    gl.FLOAT,
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT
    );

    perpindahan(translate,program);

    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);
    return n;
  }

  function perpindahan(translate,program)
  {
    //translasi terhadap x
    if (translate[0] + 0.5 > 0.5*5 || translate[0] + 0.2 < -0.5*5 ) {
      tambahX *= -1;
    }
    translate[0] += tambahX;

    var pseudoLoc = gl.getUniformLocation(program, 'pseudo');
    pseudo_coordinates = 0.35 + translate[0];

    gl.uniform1f(pseudoLoc, pseudo_coordinates);

    //translasi terhadap y
    if (translate[1] + 0.5 > 0.5*5 || translate[1] + -0.5 < -0.5*5 ) {
      tambahY *= -1;
    }
    translate[1] += tambahY;

    //translasi terhadap z
    if (translate[2] > 0.5*0.5 || translate[2] < -0.5*0.5 ) {
      tambahZ *= -1;
    }
    translate[2] += tambahZ;

    var translationLoc = gl.getUniformLocation(program, 'translate');

    gl.uniform3fv(translationLoc, translate);

    var thetaLoc = gl.getUniformLocation(program, 'theta');
    var theta = [-20.0, 40.0, 0.0];

    gl.uniform3fv(thetaLoc, theta);
  }

  function resizer(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

})();