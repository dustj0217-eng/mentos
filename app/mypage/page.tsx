"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Camera, User, Mail, Calendar, Edit2 } from "lucide-react"

// 로딩 스켈레톤 컴포넌트
function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pt-24 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-9 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-10 w-24 bg-slate-200 rounded animate-pulse" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 왼쪽 카드 스켈레톤 */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-slate-200 animate-pulse mb-4" />
                <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="mt-6 space-y-3 border-t pt-4">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* 오른쪽 카드 스켈레톤 */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div className="h-7 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-9 w-24 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                    <div className="h-10 bg-slate-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [nickname, setNickname] = useState("")
  const [bio, setBio] = useState("")
  const [phone, setPhone] = useState("")
  const [university, setUniversity] = useState("")
  const [major, setMajor] = useState("")
  
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/login")
        return
      }

      setUser(currentUser)

      try {
        const userRef = doc(db, "users", currentUser.uid)
        const snap = await getDoc(userRef)

        if (snap.exists()) {
          const data = snap.data()
          setNickname(data.nickname || "")
          setBio(data.bio || "")
          setPhone(data.phone || "")
          setUniversity(data.university || "")
          setMajor(data.major || "")
        }
      } catch (error) {
        console.error("유저 정보 로드 실패:", error)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSaveProfile = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요")
      return
    }

    setSaving(true)
    try {
      await setDoc(
        doc(db, "users", user.uid),
        { 
          nickname,
          bio,
          phone,
          university,
          major,
          updatedAt: new Date()
        },
        { merge: true }
      )
      alert("프로필이 저장되었습니다")
      setIsEditing(false)
    } catch (error) {
      console.error("프로필 저장 실패:", error)
      alert("저장에 실패했습니다")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      await signOut(auth)
      router.push("/")
    }
  }

  // 로딩 중일 때 스켈레톤 표시
  if (loading) {
    return <ProfileSkeleton />
  }

  if (!user) {
    return null
  }

  const joinDate = user.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '알 수 없음'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pt-24 pb-20">
        {/* 페이지 헤더 */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">마이페이지</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-slate-600 hover:text-slate-900"
          >
            로그아웃
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 왼쪽: 프로필 카드 */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              {/* 프로필 사진 */}
              <div className="mb-6 flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-4xl font-bold text-indigo-600">
                    {nickname ? nickname[0].toUpperCase() : <User size={48} />}
                  </div>
                  <button 
                    className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                    title="프로필 사진 변경"
                  >
                    <Camera size={18} />
                  </button>
                </div>
                
                <h2 className="mb-1 text-xl font-bold text-slate-900">
                  {nickname || "닉네임을 설정해주세요"}
                </h2>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>

              {/* 간단한 정보 */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="text-slate-400" size={16} />
                  <span className="text-slate-600">
                    {user.providerData[0]?.providerId === "google.com"
                      ? "Google 계정"
                      : "이메일 계정"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="text-slate-400" size={16} />
                  <span className="text-slate-600">
                    가입일: {joinDate}
                  </span>
                </div>
              </div>

              {/* 통계 */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">0</div>
                  <div className="text-xs text-slate-500">멘토링</div>
                </div>
                <div className="text-center border-x">
                  <div className="text-2xl font-bold text-slate-900">0</div>
                  <div className="text-xs text-slate-500">후기</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">0</div>
                  <div className="text-xs text-slate-500">북마크</div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 상세 정보 */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              {/* 섹션 헤더 */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">프로필 정보</h3>
                {!isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Edit2 size={16} />
                    수정하기
                  </Button>
                )}
              </div>

              {/* 프로필 폼 */}
              <div className="space-y-6">
                {/* 닉네임 */}
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="text-sm font-semibold text-slate-700">
                    닉네임 *
                  </Label>
                  <Input
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="사용할 닉네임을 입력하세요"
                    disabled={!isEditing}
                    className={!isEditing ? "bg-slate-50" : ""}
                  />
                </div>

                {/* 소개 */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-semibold text-slate-700">
                    자기소개
                  </Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="간단한 자기소개를 입력해주세요"
                    rows={4}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-slate-50" : ""}
                  />
                  <p className="text-xs text-slate-500">
                    {bio.length}/500자
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* 대학교 */}
                  <div className="space-y-2">
                    <Label htmlFor="university" className="text-sm font-semibold text-slate-700">
                      대학교
                    </Label>
                    <Input
                      id="university"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="예: 서울대학교"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                    />
                  </div>

                  {/* 전공 */}
                  <div className="space-y-2">
                    <Label htmlFor="major" className="text-sm font-semibold text-slate-700">
                      전공
                    </Label>
                    <Input
                      id="major"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      placeholder="예: 컴퓨터공학과"
                      disabled={!isEditing}
                      className={!isEditing ? "bg-slate-50" : ""}
                    />
                  </div>
                </div>

                {/* 연락처 */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                    연락처
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    disabled={!isEditing}
                    className={!isEditing ? "bg-slate-50" : ""}
                  />
                </div>

                {/* 이메일 (읽기 전용) */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">
                    이메일
                  </Label>
                  <Input
                    value={user.email}
                    disabled
                    className="bg-slate-50"
                  />
                  <p className="text-xs text-slate-500">
                    이메일은 변경할 수 없습니다
                  </p>
                </div>

                {/* 저장/취소 버튼 */}
                {isEditing && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={saving}
                      className="flex-1"
                    >
                      {saving ? "저장 중..." : "저장하기"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      취소
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* 계정 관리 */}
            <div className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-slate-900">계정 관리</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-slate-900">비밀번호 변경</p>
                    <p className="text-sm text-slate-500">계정 보안을 위해 정기적으로 변경해주세요</p>
                  </div>
                  <Button variant="outline" size="sm">
                    변경
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-slate-900">알림 설정</p>
                    <p className="text-sm text-slate-500">이메일 및 푸시 알림을 관리합니다</p>
                  </div>
                  <Button variant="outline" size="sm">
                    설정
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-red-600">회원 탈퇴</p>
                    <p className="text-sm text-slate-500">모든 데이터가 영구적으로 삭제됩니다</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                    탈퇴
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}