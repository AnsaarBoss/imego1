window.ImegoEngine = {
  currentFile: null,
  imageElement: null,

  initDropzone(dropzoneId, inputId, onLoadedCallback) {
    const dropzone = document.getElementById(dropzoneId);
    const fileInput = document.getElementById(inputId);

    if (!dropzone || !fileInput) return;

    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        this.loadFile(e.dataTransfer.files[0], dropzone, onLoadedCallback);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.loadFile(e.target.files[0], dropzone, onLoadedCallback);
      }
    });
  },

  loadFile(file, dropzone, callback) {
    this.currentFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        this.imageElement = img;
        dropzone.classList.add('hidden'); // Smoothly hide dropzone on upload
        if (callback) callback();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};