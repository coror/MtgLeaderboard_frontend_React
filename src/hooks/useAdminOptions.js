import { useState } from 'react';

export default function useAdminOptions() {
  const [showRegistrationFormEDH, setShowRegistrationFormEDH] = useState(false);
  const [showRegistrationFormEDHPlayer, setShowRegistrationFormEDHPlayer] =
    useState(false);
  const [showEditWinsEDH, setShowEditWinsEDH] = useState(false);
  const [showEditLossesEDH, setShowEditLossesEDH] = useState(false);
  const [showEditWinsEDHPlayer, setShowEditWinsEDHPlayer] = useState(false);
  const [showEditLossesEDHPlayer, setShowEditLossesEDHPlayer] = useState(false);
  const [showUploadAvatarEDH, setShowUploadAvatarEDH] = useState(false);
  const [showUploadAvatarEDHPlayer, setShowUploadAvatarEDHPlayer] =
    useState(false);
  const [showCreateNewUser, setShowCreateNewUser] = useState(false);

  const [showDeleteEDH, setShowDeleteEDH] = useState(false);
  const [showDeleteEDHPlayer, setShowDeleteEDHPlayer] = useState(false);
  const [showCreateEdhMatch, setShowCreateEdhMatch] = useState(false);
  const [showCreateEdhPlayerMatch, setShowCreateEdhPlayerMatch] =
    useState(false);

  const toggleRegistrationFormEDH = async () => {
    setShowRegistrationFormEDH(!showRegistrationFormEDH);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleRegistrationFormEDHPlayer = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(true);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleEditWinsEDH = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(!showEditWinsEDH);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleEditLossesEDH = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(!showEditLossesEDH);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleEditWinsEDHPlayer = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(!showEditWinsEDHPlayer);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleEditLossesEDHPlayer = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(!showEditLossesEDHPlayer);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleUploadAvatarEDH = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(!showUploadAvatarEDH);
    setShowUploadAvatarEDHPlayer(false);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleUploadAvatarEDHPlayer = async () => {
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(!showUploadAvatarEDHPlayer);
    setShowCreateNewUser(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleCreateNewUser = async () => {
    setShowCreateNewUser(!showCreateNewUser);
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleDeleteEDH = async () => {
    setShowCreateNewUser(false);
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowDeleteEDH(!showDeleteEDH);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleDeleteEDHPlayer = async () => {
    setShowCreateNewUser(false);
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(!showDeleteEDHPlayer);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleCreateEDHMatch = async () => {
    setShowCreateNewUser(false);
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(!showCreateEdhMatch);
    setShowCreateEdhPlayerMatch(false);
  };

  const toggleCreateEDHPlayerMatch = async () => {
    setShowCreateNewUser(false);
    setShowRegistrationFormEDH(false);
    setShowRegistrationFormEDHPlayer(false);
    setShowEditWinsEDH(false);
    setShowEditLossesEDH(false);
    setShowEditWinsEDHPlayer(false);
    setShowEditLossesEDHPlayer(false);
    setShowUploadAvatarEDH(false);
    setShowUploadAvatarEDHPlayer(false);
    setShowDeleteEDH(false);
    setShowDeleteEDHPlayer(false);
    setShowCreateEdhMatch(false);
    setShowCreateEdhPlayerMatch(!showCreateEdhPlayerMatch);
  };

  return {
    toggleCreateEDHPlayerMatch,
    toggleCreateEDHMatch,
    toggleDeleteEDHPlayer,
    toggleDeleteEDH,
    toggleCreateNewUser,
    toggleUploadAvatarEDHPlayer,
    toggleUploadAvatarEDH,
    toggleEditLossesEDHPlayer,
    toggleEditWinsEDHPlayer,
    toggleEditLossesEDH,
    toggleEditWinsEDH,
    toggleRegistrationFormEDHPlayer,
    toggleRegistrationFormEDH,
    showCreateNewUser,
    showCreateEdhMatch,
    showCreateEdhPlayerMatch,
    showRegistrationFormEDHPlayer,
    showEditWinsEDHPlayer,
    showEditLossesEDHPlayer,
    showUploadAvatarEDHPlayer,
    showDeleteEDHPlayer,
    showRegistrationFormEDH,
    showEditWinsEDH,
    showEditLossesEDH,
    showUploadAvatarEDH,
    showDeleteEDH,
  };
}
