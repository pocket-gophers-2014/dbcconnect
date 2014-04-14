require 'spec_helper'

describe PairingsController do
  let(:fake_pairing){FactoryGirl.create(:pairing)}

  # This route can't be tested without a current user logged it
  describe "index" do
  end

  describe "show" do
    before(:each) { get :show, id: fake_pairing.id }
    it "loads a pairing tuple into @pairing" do
      expect(assigns(:pairing)).to eq fake_pairing
    end

    it "renders pairing to json" do
      @expected = { pairing: assigns(:pairing) }.to_json
      expect(response.body).to eq @expected
    end
  end

  describe "create" do
    context "with valid params" do
      it "adds pairing to database if valid pairing attributes" do
        expect{
          post :create, pairing: FactoryGirl.attributes_for(:pairing)
          }.to change{ Pairing.count }.by(1)
      end

      it "renders pairing to json" do
        post :create, pairing: FactoryGirl.attributes_for(:pairing)
        @expected = { success: true, pairing: assigns(:pairing) }.to_json
        expect(response.body).to eq @expected
      end
    end
    context "with invalid params" do
    end
  end

  # No test for edit is required because tests would be same as for #show
  describe "edit" do
  end

  describe "destroy" do
    context "with valid params" do
      it "deletes a pairing table entry" do
        fake_pairing
        expect{
          delete :destroy, id: fake_pairing.id
          }.to change{ Pairing.count }.by(-1)
      end
      it "renders 'success: true' to json" do
        fake_pairing
        delete :destroy, id: fake_pairing.id
        @expected = { success: true }.to_json
        expect(response.body).to eq @expected
      end
    end
    context "with invalid params" do
    end
  end

  describe "update" do
    context "with valid params" do
      it "updates a pairing table entry" do
        new_requestor_feedback = "bla bla bla"
        expect {
          put(:update, id: fake_pairing.id, pairing: { requestor_feedback: new_requestor_feedback })
        }.to change { fake_pairing.reload.requestor_feedback }.to(new_requestor_feedback)
      end
      it "renders pairing to json" do
        new_requestor_feedback2 = "bla2 bla2 bla2"
        put(:update, id: fake_pairing.id, pairing: { requestor_feedback: new_requestor_feedback2 })
        @expected = { success: true, pairing: assigns(:pairing) }.to_json
        expect(response.body).to eq @expected
      end
    end
    context "with invalid params" do
    end
  end

end