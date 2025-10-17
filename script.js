document.addEventListener('DOMContentLoaded', () => {
  // ===================== Responsive menu toggle =====================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // ===================== Scroll fade-up animation =====================
  const faders = document.querySelectorAll('.fade-up');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));

  // ===================== Dynamic year in footer =====================
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===================== Contact Form Submission =====================
  const form = document.getElementById('contactForm');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      tour: form.tour.value,
      message: form.message.value
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you for contacting us!'); // Or use custom modal
        form.reset();
      } else {
        alert(result.error || 'Something went wrong!');
      }
    } catch (error) {
      alert('Failed to send enquiry.');
      console.error(error);
    }
  });
});
