
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // 1. PROJECTS DATA
  // =====================================

  const projects = {
    transova: {
      title: "TransOva",
      status: "PROJET RÉALISÉ",
      image: "assets/transova.png",
      caption: "Aperçu de la plateforme TransOva",
      description:
        "TransOva est une application web dédiée à la gestion du transport en bus. Elle facilite l'organisation des trajets et la gestion des réservations.",
      technologies: ["React", "Laravel", "MySQL", "API REST"],
      features: [
        "Consultation des trajets",
        "Gestion des bus",
        "Gestion des villes",
        "Gestion des trajets",
        "Gestion des réservations",
        "Espace administrateur"
      ],
      domain: "Transport & mobilité",
      type: "Application Web Full Stack",
      note:
        "Ce projet m'a permis de développer mes compétences frontend, backend et en gestion de bases de données."
    },

    agharbi: {
      title: "Agharbi Parfum",
      status: "PROJET RÉALISÉ",
      image: "assets/agharbi.png",
      caption: "Aperçu de la boutique Agharbi Parfum",
      description:
        "Agharbi Parfum est un site e-commerce développé pour une boutique physique spécialisée dans la vente de parfums.",
      technologies: ["React", "Laravel", "MySQL", "API REST"],
      features: [
        "Présentation des parfums",
        "Navigation par catégories",
        "Consultation des produits",
        "Ajout au panier",
        "Gestion des quantités",
        "Formulaire de commande",
        "Enregistrement des commandes",
        "Gestion des produits par l'administrateur"
      ],
      domain: "E-commerce & parfumerie",
      type: "Application Web Full Stack",
      note:
        "Projet développé pour répondre aux besoins d'une boutique de parfumerie."
    },

    taskflow: {
      title: "TaskFlow",
      status: "CONCEPT À RÉALISER",
      image: "",
      caption: "Concept de gestion des tâches",
      description:
        "TaskFlow est un concept d'application web permettant d'organiser les tâches quotidiennes.",
      technologies: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      features: [
        "Ajouter une tâche",
        "Modifier une tâche",
        "Supprimer une tâche",
        "Marquer une tâche comme terminée",
        "Sauvegarder les tâches"
      ],
      domain: "Productivité",
      type: "Concept d'application web",
      note: "Ce projet est une idée personnelle qui reste à réaliser."
    },

    smartbudget: {
      title: "SmartBudget",
      status: "CONCEPT À RÉALISER",
      image: "",
      caption: "Concept de gestion du budget",
      description:
        "SmartBudget est un concept d'application pour gérer les revenus, les dépenses et le budget mensuel.",
      technologies: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      features: [
        "Ajouter des revenus",
        "Enregistrer les dépenses",
        "Calculer le solde",
        "Consulter l'historique",
        "Afficher des statistiques"
      ],
      domain: "Finance personnelle",
      type: "Concept d'application web",
      note: "Ce projet est une idée personnelle qui reste à réaliser."
    },

    bibliomanager: {
      title: "BiblioManager",
      status: "CONCEPT À RÉALISER",
      image: "",
      caption: "Concept de gestion de bibliothèque",
      description:
        "BiblioManager est un concept d'application web pour gérer les livres, les membres et les emprunts.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      features: [
        "Ajouter des livres",
        "Modifier les livres",
        "Gérer les membres",
        "Enregistrer les emprunts",
        "Suivre les retours"
      ],
      domain: "Gestion & bibliothèque",
      type: "Concept d'application web",
      note: "Ce projet est une idée personnelle qui reste à réaliser."
    }
  };


  // =====================================
  // 2. PROJECT DETAILS MODAL
  // =====================================

  const modal = document.getElementById("projectModal");

  const closeModal = () => {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  function openProject(projectKey) {
    const project = projects[projectKey];

    if (!project || !modal) return;

    const setText = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };

    setText("modalTitle", project.title);
    setText("modalStatus", project.status);
    setText("modalDescription", project.description);
    setText("modalCaption", project.caption);
    setText("modalDomain", project.domain);
    setText("modalType", project.type);
    setText("modalNote", project.note);

    const image = document.getElementById("modalImage");

    if (image) {
      if (project.image) {
        image.src = project.image;
        image.alt = project.caption;
        image.style.display = "block";
      } else {
        image.removeAttribute("src");
        image.style.display = "none";
      }
    }

    const techContainer = document.getElementById("modalTech");

    if (techContainer) {
      techContainer.replaceChildren();

      project.technologies.forEach(technology => {
        const span = document.createElement("span");
        span.textContent = technology;
        techContainer.appendChild(span);
      });
    }

    const featuresContainer =
      document.getElementById("modalFeatures");

    if (featuresContainer) {
      featuresContainer.replaceChildren();

      project.features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresContainer.appendChild(li);
      });
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const closeButton = document.getElementById("modalClose");
    if (closeButton) closeButton.focus();
  }

  document.querySelectorAll(".detail-btn").forEach(button => {
    button.addEventListener("click", () => {
      openProject(button.dataset.project);
    });
  });

  const closeButton = document.getElementById("modalClose");
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  const overlay = document.getElementById("modalOverlay");
  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
    }
  });


  // =====================================
  // 3. PROJECT FILTERS
  // =====================================

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {

      filterButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;

        const show =
          filter === "all" || category === filter;

        card.classList.toggle("hidden", !show);
      });

    });
  });


  // =====================================
  // 4. MOBILE MENU
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("show");

      menuToggle.textContent = isOpen ? "×" : "☰";
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

  }


  // =====================================
  // 5. CLOSE MENU WHEN CLICKING OUTSIDE
  // =====================================

  document.addEventListener("click", event => {

    if (!menuToggle || !navMenu) return;

    const clickedInsideMenu =
      navMenu.contains(event.target) ||
      menuToggle.contains(event.target);

    if (!clickedInsideMenu) {
      navMenu.classList.remove("show");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }

  });


  // =====================================
  // 6. SCROLL REVEAL ANIMATION
  // =====================================

  const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .timeline-item, .contact-card"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      element.classList.add("reveal");
      observer.observe(element);
    });

  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }


  // =====================================
  // 7. FOOTER YEAR
  // =====================================

  const yearElement = document.querySelector(".footer-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // =====================================
  // 8. ACTIVE NAVIGATION
  // =====================================

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("#navMenu a[href^='#']");

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {
            link.classList.remove("active-link");

            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.classList.add("active-link");
            }
          });

        }

      });

    }, {
      rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }

  console.log("Portfolio Aya Elmouden : JavaScript chargé avec succès.");

});
