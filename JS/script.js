document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'index.html' || currentPage === '') {
        initHomepage();
    } else if (currentPage === 'gallery.html') {
        initGallery();
    } else if (currentPage === 'community.html') {
        initCommunity();
    } else if (currentPage === 'submit.html') {
        initSubmit();
    }

    setActiveNavLink();
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initHomepage() {
    const slides = document.querySelectorAll('.slideshow-image');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 4000);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    const artworkCards = document.querySelectorAll('.artwork-card');
    artworkCards.forEach(card => {
        card.addEventListener('click', function() {
            const postId = this.dataset.id;
            window.location.href = `community.html?post=${postId}`;
        });
    });
}

function initGallery() {
    let viewMode = 'grid';

    const viewBtn = document.getElementById('viewBtn');
    const viewDropdown = document.getElementById('viewDropdown');
    const galleryGrid = document.getElementById('galleryGrid');
    const viewMoreCard = document.getElementById('viewMoreCard');

    viewBtn.addEventListener('click', () => {
        viewDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!viewBtn.contains(e.target) && !viewDropdown.contains(e.target)) {
            viewDropdown.classList.remove('show');
        }
    });

    document.querySelectorAll('[data-view]').forEach(item => {
        item.addEventListener('click', (e) => {
            viewMode = e.target.closest('[data-view]').dataset.view;
            updateViewButton();
            updateGalleryView();
            viewDropdown.classList.remove('show');
        });
    });

    viewMoreCard.addEventListener('click', () => {
        const hiddenCard = document.querySelector('.artwork-card[data-id="10"]');
        if (hiddenCard) {
            hiddenCard.style.display = 'block';
            viewMoreCard.style.display = 'none';
        }
    });

    function updateViewButton() {
        const icon = viewMode === 'grid' ? 'fas fa-th' : 'fas fa-list';
        viewBtn.innerHTML = `<i class="${icon}"></i> <span>View</span>`;
    }

    function updateGalleryView() {
        galleryGrid.className = `gallery-grid ${viewMode === 'list' ? 'list-view' : ''}`;
    }

    const artworkCards = document.querySelectorAll('.artwork-card');
    artworkCards.forEach(card => {
        card.addEventListener('click', function() {
            const postId = this.dataset.id;
            window.location.href = `community.html?post=${postId}`;
        });
    });

    const hiddenCard = document.createElement('div');
    hiddenCard.className = 'artwork-card';
    hiddenCard.dataset.id = '10';
    hiddenCard.style.display = 'none';
    hiddenCard.innerHTML = `
        <img src="../assets/images/zoro.jpg" alt="Zoro">
        <div class="card-content">
            <h3 class="card-title">Zoro</h3>
            <p class="card-artist">by Loki656</p>
            <div class="card-stats">
                <div>
                    <i class="fas fa-heart"></i>
                    <span>257</span>
                </div>
                <span class="card-category">Digital Art</span>
            </div>
        </div>
    `;
    galleryGrid.insertBefore(hiddenCard, viewMoreCard);

    hiddenCard.addEventListener('click', function() {
        const postId = this.dataset.id;
        window.location.href = `community.html?post=${postId}`;
    });
}

function initCommunity() {
    let followStates = {
        mainPost: false,
        hanin: false,
        rpg: false,
        kim: false
    };
    let liked = false;
    let saved = false;

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post') || '1';

    const style = document.createElement('style');
    style.textContent = `
        .author-avatar img, .caption-avatar, .comment-avatar, .user-avatar img {
            border-radius: 50% !important;
            object-fit: cover !important;
        }
        
        .author-avatar {
            position: relative;
            width: fit-content;
        }
        
        .author-avatar img {
            width: 2.5rem !important;
            height: 2.5rem !important;
        }
        
        .caption-avatar {
            width: 2rem !important;
            height: 2rem !important;
        }
        
        .comment-avatar {
            width: 2rem !important;
            height: 2rem !important;
        }
        
        .user-avatar {
            position: relative;
            width: fit-content;
        }
        
        .user-avatar img {
            width: 2rem !important;
            height: 2rem !important;
        }
        
        .verified-badge {
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 1rem !important;
            height: 1rem !important;
            background-color: #3b82f6;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .verified-badge i {
            font-size: 0.5rem !important;
            color: white;
        }
    `;
    document.head.appendChild(style);

    const postData = {
        1: {
            title: "0.1 flaws and all.",
            author: "wave_to_earth",
            username: "@wave_to_earth",
            avatar: "../assets/images/wave.jpg",
            verified: true,
            image: "../assets/images/artwork1.jpg",
            likes: 1200,
            caption: "Embracing imperfection in art. Sometimes the flaws make it beautiful ✨",
            timestamp: "4 hours ago"
        },
        2: {
            title: "To Let A Good Thing Die",
            author: "Bruno Major",
            username: "@bruno_major",
            avatar: "../assets/images/bruno.jpg",
            verified: true,
            image: "../assets/images/to let a good thing die.jpg",
            likes: 247,
            caption: "Sometimes letting go is the most beautiful thing you can do 🎵",
            timestamp: "5 hours ago"
        },
        3: {
            title: "a beautiful blur",
            author: "LANY",
            username: "@lany",
            avatar: "../assets/images/lanypfp.jpg",
            verified: true,
            image: "../assets/images/a beautiful blur.jpg",
            likes: 785,
            caption: "Life moves fast, but sometimes the blur is where the beauty lies 💫",
            timestamp: "1 day ago"
        },
        4: {
            title: "Freudian",
            author: "Daniel Caesar",
            username: "@daniel_caesar",
            avatar: "../assets/images/danielcaesar.jpg",
            verified: true,
            image: "../assets/images/freaudian.jpg",
            likes: 1200,
            caption: "Exploring the depths of the human psyche through music 🧠✨",
            timestamp: "2 days ago"
        },
        5: {
            title: "Steam",
            author: "Valve",
            username: "@valve",
            avatar: "../assets/images/steam.jpg",
            verified: true,
            image: "../assets/images/steam.jpg",
            likes: 400,
            caption: "Gaming is not just entertainment, it's an art form 🎮",
            timestamp: "3 hours ago"
        },
        6: {
            title: "Rayquaza",
            author: "あすてろid",
            username: "@asuteroid",
            avatar: "../assets/images/rayq.jpg",
            verified: true,
            image: "../assets/images/rayq.jpg",
            likes: 5400,
            caption: "The legendary dragon soars through digital skies 🐉⚡",
            timestamp: "1 week ago"
        },
        7: {
            title: "Mario",
            author: "Alpha",
            username: "@alpha_creates",
            avatar: "../assets/images/mario.jpg",
            verified: false,
            image: "../assets/images/mario.jpg",
            likes: 542,
            caption: "It's-a me! Bringing childhood memories to life through art 🍄",
            timestamp: "3 days ago"
        },
        8: {
            title: "Watermelon Cat",
            author: "Steve",
            username: "@steve_art",
            avatar: "../assets/images/steve.jpg",
            verified: false,
            image: "../assets/images/watermelon carr.jpg",
            likes: 878,
            caption: "When cats meet summer vibes! Sweet and refreshing 🍉😸",
            timestamp: "5 days ago"
        },
        9: {
            title: "Haerin",
            author: "MHDHH",
            username: "@mhdhh_friends",
            avatar: "../assets/images/haerin.jpg",
            verified: true,
            image: "../assets/images/haerin.jpg",
            likes: 980,
            caption: "Capturing the essence of pure talent and beauty 🌟",
            timestamp: "6 days ago"
        },
        10: {
            title: "Zoro",
            author: "Loki656",
            username: "@loki656",
            avatar: "../assets/images/loki.jpg",
            verified: true,
            image: "../assets/images/zoro.jpg",
            likes: 257,
            caption: "The way of the sword, captured in digital form ⚔️",
            timestamp: "1 hour ago"
        }
    };

    const currentPost = postData[postId] || postData[1];
    updateMainPost(currentPost);

    const mainFollowBtn = document.getElementById('mainFollowBtn');
    const likeBtn = document.getElementById('likeBtn');
    const saveBtn = document.getElementById('saveBtn');

    mainFollowBtn.addEventListener('click', () => {
        followStates.mainPost = !followStates.mainPost;
        mainFollowBtn.textContent = followStates.mainPost ? 'Following' : 'Follow';
        mainFollowBtn.className = followStates.mainPost ? 'btn follow-btn following btn-sm' : 'btn follow-btn btn-outline btn-sm';
    });

    likeBtn.addEventListener('click', () => {
        liked = !liked;
        likeBtn.className = liked ? 'action-btn liked' : 'action-btn';
        const likesSpan = likeBtn.querySelector('span');
        const currentLikes = parseInt(likesSpan.textContent.replace(/,/g, ''));
        likesSpan.textContent = (liked ? currentLikes + 1 : currentLikes - 1).toLocaleString();
    });

    saveBtn.addEventListener('click', () => {
        saved = !saved;
        saveBtn.className = saved ? 'action-btn saved' : 'action-btn';
    });

    const followBtns = document.querySelectorAll('[data-user]');
    followBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userKey = e.target.dataset.user;
            followStates[userKey] = !followStates[userKey];
            e.target.textContent = followStates[userKey] ? 'Following' : 'Follow';
            e.target.className = followStates[userKey] ? 'btn follow-btn following' : 'btn follow-btn btn-outline';
        });
    });

    function updateMainPost(post) {
        const authorAvatar = document.getElementById('authorAvatar');
        const verifiedBadge = document.getElementById('verifiedBadge');
        authorAvatar.src = post.avatar;
        authorAvatar.alt = post.author;

        if (post.verified) {
            verifiedBadge.style.display = 'flex';
        } else {
            verifiedBadge.style.display = 'none';
        }

        const authorName = document.getElementById('authorName');
        const authorMeta = document.getElementById('authorMeta');
        authorName.innerHTML = post.author + ' <button class="btn follow-btn btn-outline btn-sm" id="mainFollowBtn">Follow</button>';
        authorMeta.textContent = `${post.username} • ${post.timestamp}`;

        const postImage = document.getElementById('postImage');
        const imageOverlay = document.getElementById('imageOverlay');
        postImage.src = post.image;
        postImage.alt = post.title;
        imageOverlay.textContent = post.title;

        const likesCount = document.getElementById('likesCount');
        likesCount.textContent = post.likes.toLocaleString();

        const captionAvatar = document.getElementById('captionAvatar');
        const captionAuthorName = document.getElementById('captionAuthorName');
        const captionVerifiedBadge = document.getElementById('captionVerifiedBadge');
        const captionText = document.getElementById('captionText');

        captionAvatar.src = post.avatar;
        captionAvatar.alt = post.author;
        captionAuthorName.textContent = post.author;

        if (post.verified) {
            captionVerifiedBadge.style.display = 'flex';
        } else {
            captionVerifiedBadge.style.display = 'none';
        }

        captionText.textContent = post.caption;

        document.getElementById('mainFollowBtn').addEventListener('click', () => {
            followStates.mainPost = !followStates.mainPost;
            document.getElementById('mainFollowBtn').textContent = followStates.mainPost ? 'Following' : 'Follow';
            document.getElementById('mainFollowBtn').className = followStates.mainPost ? 'btn follow-btn following btn-sm' : 'btn follow-btn btn-outline btn-sm';
        });
    }
}

function initSubmit() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const submitForm = document.getElementById('submitForm');

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    function handleFileUpload(file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadArea.innerHTML = `
                    <img src="${e.target.result}" alt="Uploaded preview" style="width: 8rem; height: 8rem; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <p style="color: #6b7280; margin-bottom: 1rem;">Image uploaded successfully!</p>
                    <button type="button" class="btn btn-outline btn-sm">Change Image</button>
                `;

                uploadArea.querySelector('button').addEventListener('click', () => {
                    fileInput.click();
                });
            };
            reader.readAsDataURL(file);
        }
    }

    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            tags: document.getElementById('tags').value,
            category: document.getElementById('category').value
        };

        if (!formData.title || !formData.description || !formData.category) {
            alert('Please fill in all required fields');
            return;
        }

        alert('Artwork submitted successfully! Redirecting to advanced settings...');
    });
}