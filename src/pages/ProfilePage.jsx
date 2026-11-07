import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  School,
  GraduationCap,
  MapPin,
  DollarSign,
  Award,
  Edit2,
  Check,
  X,
  ShieldCheck,
  Save,
} from 'lucide-react';
import {
  BaseCard,
  CardHeader,
  CardTitle,
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  Badge,
  TextInput,
  SelectInput,
  ProgressBar,
} from '../components/ui';
import FadeIn from '../components/animations/FadeIn';
import { useApp } from '../context/AppContext';
import { EDUCATION_LEVELS } from '../utils/constants';
import AmbientBackground from '../components/common/AmbientBackground';

export const ProfilePage = () => {
  const { user, updateUserProfile } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Form State initialized from user
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    collegeName: user.collegeName || user.university || '',
    educationLevel: user.educationLevel || 'Undergraduate (Junior/Senior)',
    course: user.course || user.major || '',
    academicYear: user.academicYear || 'Senior (4th Year)',
    state: user.state || 'California',
    academicPercentage: user.academicPercentage || 92,
    annualHouseholdIncome: user.annualHouseholdIncome || '$60,000 - $80,000',
    institutionType: user.institutionType || 'Four-Year University (Private Non-Profit)',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    updateUserProfile({
      ...formData,
      university: formData.collegeName,
      major: formData.course,
      role: formData.educationLevel,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      collegeName: user.collegeName || user.university || '',
      educationLevel: user.educationLevel || 'Undergraduate (Junior/Senior)',
      course: user.course || user.major || '',
      academicYear: user.academicYear || 'Senior (4th Year)',
      state: user.state || 'California',
      academicPercentage: user.academicPercentage || 92,
      annualHouseholdIncome: user.annualHouseholdIncome || '$60,000 - $80,000',
      institutionType: user.institutionType || 'Four-Year University (Private Non-Profit)',
    });
    setIsEditing(false);
  };

  // Completion calculation
  const fields = Object.values(formData);
  const completedCount = fields.filter(Boolean).length;
  const completionPercent = Math.round((completedCount / fields.length) * 100);

  return (
    <AmbientBackground variant="profile">
      <FadeIn className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="coral">Scholar Credentials</Badge>
            <Badge variant="success">Verified Academic Record</Badge>
          </div>
          <h1 className="heading-page text-2xl sm:text-3xl text-[var(--text-primary)]">
            Student Profile & Settings
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">
            These credentials power your algorithmic eligibility match scores across all grant programs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <PrimaryButton icon={Edit2} onClick={() => setIsEditing(true)}>
              Edit Profile
            </PrimaryButton>
          ) : (
            <div className="flex items-center gap-2">
              <SecondaryButton size="sm" icon={X} onClick={handleCancel}>
                Cancel
              </SecondaryButton>
              <PrimaryButton size="sm" icon={Save} onClick={handleSave}>
                Save Changes
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>

      {/* Profile Overview Card with Avatar & Completion */}
      <BaseCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover ring-4 ring-[var(--coral)]/30 shadow-md"
            />
            <div className="space-y-1">
              <h2 className="heading-card text-xl text-[var(--text-primary)]">{user.name}</h2>
              <p className="text-xs text-[var(--text-muted)]">{user.email} &bull; Demo Scholar</p>
              <div className="flex items-center gap-2 pt-1">
                <Badge variant="peach" size="sm">{formData.collegeName}</Badge>
                <Badge variant="coral" size="sm">{formData.course}</Badge>
              </div>
            </div>
          </div>

          {/* Profile Completion Indicator */}
          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] min-w-[240px] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
              <span>Profile Completeness</span>
              <span className="text-[var(--primary)]">{completionPercent}%</span>
            </div>
            <ProgressBar value={completionPercent} color="coral" size="sm" showPercentage={false} />
            <p className="text-[11px] text-[var(--text-muted)]">
              {completionPercent === 100 ? 'All 10 required parameters completed' : 'Complete missing fields for higher match accuracy'}
            </p>
          </div>
        </div>
      </BaseCard>

      {/* Editable Profile Fields */}
      <BaseCard className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
          <h3 className="heading-card text-base text-[var(--text-primary)]">
            Academic & Household Attributes
          </h3>
          <span className="text-xs text-[var(--text-muted)]">
            {isEditing ? 'Editing Mode Active' : 'Read-Only Mode'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextInput
            label="Full Name"
            value={formData.name}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />

          <TextInput
            label="Institutional Email (Demo)"
            value={formData.email}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />

          <TextInput
            label="College / University Name"
            value={formData.collegeName}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('collegeName', e.target.value)}
          />

          <SelectInput
            label="Education Level"
            value={formData.educationLevel}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('educationLevel', e.target.value)}
            options={EDUCATION_LEVELS}
          />

          <TextInput
            label="Degree Course / Major"
            value={formData.course}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('course', e.target.value)}
          />

          <TextInput
            label="Current Academic Year"
            value={formData.academicYear}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('academicYear', e.target.value)}
          />

          <TextInput
            label="State of Primary Residence"
            value={formData.state}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('state', e.target.value)}
          />

          <TextInput
            label="Academic Percentage (%)"
            value={formData.academicPercentage}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('academicPercentage', e.target.value)}
          />

          <SelectInput
            label="Annual Household Income Range"
            value={formData.annualHouseholdIncome}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('annualHouseholdIncome', e.target.value)}
            options={[
              'Under $30,000',
              '$30,000 - $60,000',
              '$60,000 - $80,000',
              '$80,000 - $110,000',
              'Above $110,000',
            ]}
          />

          <SelectInput
            label="Institution Type"
            value={formData.institutionType}
            disabled={!isEditing}
            onChange={(e) => handleInputChange('institutionType', e.target.value)}
            options={[
              'Four-Year University (Private Non-Profit)',
              'Four-Year University (Public State)',
              'Community College / Junior College',
              'Vocational / Technical Institute',
            ]}
          />
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
            <PrimaryButton onClick={handleSave} icon={Save}>
              Save Profile Changes
            </PrimaryButton>
          </div>
        )}
      </BaseCard>
    </FadeIn>
  </AmbientBackground>
  );
};

export default ProfilePage;
