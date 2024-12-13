// Nasłuchujemy na najechanie na kropkę
document.querySelectorAll('.sidebar .dot').forEach(dot => {
  dot.addEventListener('mouseover', function() {
    // Pokazuje nazwę sekcji przy najechaniu na kropkę
    const sectionName = dot.getAttribute('data-section');
    const sectionTooltip = document.createElement('div');
    sectionTooltip.classList.add('tooltip');
    sectionTooltip.textContent = sectionName;
    dot.appendChild(sectionTooltip);
  });

  // Usuwamy nazwę sekcji po zakończeniu najeżdżania
  dot.addEventListener('mouseout', function() {
    const tooltip = dot.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  });

  // Funkcja przewijania do sekcji po kliknięciu
  dot.addEventListener('click', function(e) {
    e.preventDefault();

    // Zmiana działania kliknięcia, aby przewinąć do sekcji
    const targetSection = document.querySelector(dot.getAttribute('href'));

    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });
  });
});

// Funkcja przełączania sekcji za pomocą scrolla oraz klawiatury

// Funkcja do przewinięcia do kolejnej sekcji
function scrollToSection(offset) {
  const sections = document.querySelectorAll('.section');
  let currentSectionIndex = 0;

  // Znajdowanie bieżącej sekcji
  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= window.innerHeight / 2) {
      currentSectionIndex = index;
    }
  });

  // Przewijanie do następnej lub poprzedniej sekcji
  const nextSection = sections[currentSectionIndex + offset];
  if (nextSection) {
    window.scrollTo({
      top: nextSection.offsetTop,
      behavior: 'smooth'
    });
  }
}

// Nasłuchujemy na przewijanie scrolla (przechodzenie do kolejnej sekcji)
window.addEventListener('wheel', function(e) {
  if (e.deltaY > 0) {
    // Scroll w dół - przewijamy do następnej sekcji
    scrollToSection(1);
  } else {
    // Scroll w górę - przewijamy do poprzedniej sekcji
    scrollToSection(-1);
  }
});

// Nasłuchujemy na naciśnięcia klawiszy strzałek i Page Up/Page Down
window.addEventListener('keydown', function(e) {
  if (e.key === "ArrowDown" || e.key === "PageDown") {
    // Strzałka w dół lub Page Down - przewijamy do następnej sekcji
    scrollToSection(1);
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    // Strzałka w górę lub Page Up - przewijamy do poprzedniej sekcji
    scrollToSection(-1);
  }
});

// Sprawdź Obecność Efektu mix-blend-mode
document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.sidebar .dot');

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      dots.forEach(dot => dot.style.backgroundColor = '#000'); // Domyślny kolor kropek
      dots[index].style.backgroundColor = '#fff'; // Zmień kolor aktywnej kropki
    }
  });
});
