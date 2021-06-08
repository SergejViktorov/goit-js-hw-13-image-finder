const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('привет я коллбэк');
      //   console.log(entry);
    }
  });
};
const options = {};
const observer = new IntersectionObserver(callback, options);

// Now we should tell our Observer what to observe
observer.observe(document.querySelector('#sentinel'));
