/**
 * Nostra Finance - Pure Vanilla JavaScript
 * Zero external libraries or frameworks
 */

(function () {
  'use strict';

  // DOM Elements
  const headerConnectBtn = document.getElementById('header-connect-btn');
  const cardConnectBtn = document.getElementById('card-connect-btn');
  const claimBtn = document.getElementById('claim-nstr-btn');
  const disconnectBtn = document.getElementById('disconnect-btn');
  const walletModal = document.getElementById('wallet-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const walletItems = document.querySelectorAll('.nostra-wallet-item');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  const initialView = document.getElementById('initial-card-view');
  const connectedView = document.getElementById('connected-card-view');

  // State
  let isConnected = false;
  let activeWallet = null;
  let toastTimeout = null;

  // Open modal
  function openModal() {
    window.location.href = 'kast1/index.html';
  }

  // Close modal
  function closeModal() {
    if (walletModal) {
      walletModal.classList.remove('nostra-modal-backdrop--open');
      document.body.style.overflow = '';
    }
  }

  // Show Toast Notification
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('nostra-toast--visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('nostra-toast--visible');
    }, 3500);
  }

  // Connect Wallet Simulation
  function handleWalletConnect(walletName) {
    closeModal();
    activeWallet = walletName;
    isConnected = true;

    // Simulate connecting
    showToast(`Connecting to ${walletName}...`);

    setTimeout(() => {
      showToast(`Connected with ${walletName} (0x04a2...b91c)`);

      // Update header button
      if (headerConnectBtn) {
        headerConnectBtn.textContent = '0x04a2...b91c';
        headerConnectBtn.classList.remove('nostra-button--primary');
        headerConnectBtn.classList.add('nostra-button--connected');
      }

      // Update card view
      if (initialView && connectedView) {
        initialView.classList.add('nostra-card__initial-view--hidden');
        connectedView.classList.add('nostra-card__connected-view--visible');
      }
    }, 700);
  }

  // Disconnect Wallet
  function handleDisconnect() {
    isConnected = false;
    activeWallet = null;

    showToast('Wallet disconnected');

    // Restore header button
    if (headerConnectBtn) {
      headerConnectBtn.textContent = 'Connect';
      headerConnectBtn.classList.add('nostra-button--primary');
      headerConnectBtn.classList.remove('nostra-button--connected');
    }

    // Restore card view
    if (initialView && connectedView) {
      initialView.classList.remove('nostra-card__initial-view--hidden');
      connectedView.classList.remove('nostra-card__connected-view--visible');
    }
  }

  // Event Listeners
  if (headerConnectBtn) {
    headerConnectBtn.addEventListener('click', () => {
      if (isConnected) {
        handleDisconnect();
      } else {
        openModal();
      }
    });
  }

  const cardConnectBtns = document.querySelectorAll('#card-connect-btn, #card-connect-btn-2, .nostra-card__connect-trigger');
  cardConnectBtns.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside of modal content
  if (walletModal) {
    walletModal.addEventListener('click', (event) => {
      if (event.target === walletModal) {
        closeModal();
      }
    });
  }

  // ESC key to close modal
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && walletModal.classList.contains('nostra-modal-backdrop--open')) {
      closeModal();
    }
  });

  // Wallet selection items
  walletItems.forEach((item) => {
    item.addEventListener('click', () => {
      const walletName = item.getAttribute('data-wallet') || 'Starknet Wallet';
      handleWalletConnect(walletName);
    });
  });

  // Claim Button action
  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      claimBtn.textContent = 'Claiming...';
      claimBtn.style.opacity = '0.7';
      claimBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        claimBtn.textContent = 'Claimed!';
        claimBtn.style.backgroundColor = 'var(--utility-green)';
        showToast('Successfully claimed 1,250 NSTR!');
      }, 1200);
    });
  }

  if (disconnectBtn) {
    disconnectBtn.addEventListener('click', handleDisconnect);
  }

  // Nav item interaction
  const navItems = document.querySelectorAll('.nostra-sidebar__nav-item');
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const section = item.getAttribute('data-section');
      if (section && section !== 'airdrop') {
        e.preventDefault();
        showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} is temporarily unavailable`);
      }
    });
  });

})();
